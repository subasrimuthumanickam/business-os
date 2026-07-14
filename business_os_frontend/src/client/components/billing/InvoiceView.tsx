import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceItem {
  id?: number;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;

  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;

  items?: InvoiceItem[];
}

interface Props {
  invoice: Invoice;
  customer: any;
  onClose: () => void;
  onPay?: () => void;
  autoDownload?: boolean;
}

// Maps invoice status to badge color classes (was .status-badge.draft/.pending/.paid)
const getStatusBadgeClasses = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "draft":
      return "bg-amber-100 text-amber-800";
    case "pending":
      return "bg-blue-100 text-blue-700";
    case "paid":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const InvoiceView: React.FC<Props> = ({
  invoice,
  customer,
  onClose,
  onPay,
  autoDownload,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: customer?.currency || "INR",
    }).format(amount || 0);
  };

  // Renders dates as "28 Jun 2026" instead of the raw ISO string
  // (e.g. "2026-06-28T18:30:00.000Z") that invoice_date/due_date come
  // back as from the backend.
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (autoDownload) {
      setTimeout(() => {
        handleDownload();
        onClose();
      }, 500);
    }
  }, [autoDownload]);

  // invoice download component
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${invoice.invoice_number}.pdf`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-[30px] print:bg-white print:p-0">
      {/* Toolbar */}
      <div className="flex justify-between mb-5 print:hidden">
        <button
          className="border-none bg-blue-600 text-white px-4.5 py-2.5 rounded-lg cursor-pointer font-semibold transition-colors hover:bg-blue-700"
          onClick={onClose}
        >
          ← Back
        </button>

        <button
          className="border-none bg-blue-600 text-white px-4.5 py-2.5 rounded-lg cursor-pointer font-semibold transition-colors hover:bg-blue-700"
          onClick={() => window.print()}
        >
          🖨 Print
        </button>
      </div>

      <div
        className="max-w-[1000px] w-full mx-auto bg-white p-5 sm:p-8 lg:p-10 rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.08)] box-border print:shadow-none print:rounded-none print:max-w-full"
        ref={invoiceRef}
      >
        {/* Header */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-start gap-4 border-b-2 border-gray-200 pb-5">
          <div>
            <h1 className="m-0 text-blue-600 text-2xl font-bold">BusinessOS</h1>
            <p className="text-gray-500 mt-1.5">Business Management Software</p>
          </div>

          <div className="text-right shrink-0 w-full sm:w-auto">
            <h2 className="m-0 text-3xl font-bold">INVOICE</h2>

            <span
              className={`inline-block mt-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold ${getStatusBadgeClasses(
                invoice.status
              )}`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Customer + Invoice Details */}
        <div className="flex flex-wrap justify-between gap-4 mt-8">
          <div>
            <h4 className="mb-2.5 font-semibold">Bill To</h4>

            <p>
              <strong>{invoice.customer_name || customer?.name}</strong>
            </p>

            <p>{invoice.customer_email || customer?.email}</p>

            <p>{invoice.customer_phone || customer?.phone_work}</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-gray-500 text-[13px]">Invoice No</span>
              <strong>{invoice.invoice_number}</strong>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-[13px]">Invoice Date</span>
              <strong>{formatDate(invoice.invoice_date)}</strong>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-[13px]">Due Date</span>
              <strong>{formatDate(invoice.due_date)}</strong>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto mt-8">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr>
                <th className="bg-slate-50 text-left p-3.5 border border-gray-200">#</th>
                <th className="bg-slate-50 text-left p-3.5 border border-gray-200">Item Name</th>
                <th className="bg-slate-50 text-left p-3.5 border border-gray-200">Qty</th>
                <th className="bg-slate-50 text-left p-3.5 border border-gray-200">Rate</th>
                <th className="bg-slate-50 text-left p-3.5 border border-gray-200">Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoice.items && invoice.items.length > 0 ? (
                invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-3.5 border border-gray-200">{index + 1}</td>
                    <td className="p-3.5 border border-gray-200">{item.item_name}</td>
                    <td className="p-3.5 border border-gray-200">{item.quantity}</td>
                    <td className="p-3.5 border border-gray-200">{formatCurrency(item.rate)}</td>
                    <td className="p-3.5 border border-gray-200">{formatCurrency(item.amount)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3.5 border border-gray-200 text-center">
                    No Items Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="w-full sm:w-80 max-w-full sm:ml-auto mt-7">
          <div className="flex justify-between py-2.5">
            <span>Subtotal</span>
            <strong>{formatCurrency(invoice.subtotal)}</strong>
          </div>

          <div className="flex justify-between py-2.5">
            <span>Tax</span>
            <strong>{formatCurrency(invoice.tax)}</strong>
          </div>

          <div className="flex justify-between py-2.5 text-xl font-bold border-t-2 border-gray-200 mt-2.5 pt-4">
            <span>Total</span>
            <strong>{formatCurrency(invoice.total)}</strong>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="flex flex-wrap justify-end items-center gap-3 mt-7 print:hidden"
          data-html2canvas-ignore="true"
        >
          <button
            className="px-5 py-2.5 border border-gray-300 rounded-lg cursor-pointer text-sm font-semibold bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
            onClick={onClose}
          >
            Close
          </button>

          {invoice.status?.toLowerCase() !== "paid" && (
            <button
              className="px-5 py-2.5 border-none rounded-lg cursor-pointer text-sm font-semibold bg-blue-600 text-white transition-colors hover:bg-blue-700"
              onClick={onPay}
            >
              Pay Invoice
            </button>
          )}

          <button
            className="px-5 py-2.5 border-none rounded-lg cursor-pointer text-sm font-semibold bg-blue-600 text-white transition-colors hover:bg-blue-700"
            onClick={handleDownload}
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;