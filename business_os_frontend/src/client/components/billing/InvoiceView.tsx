import React, { useEffect, useRef } from "react";
import "./InvoiceView.css";
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

const InvoiceView: React.FC<Props> = ({
  invoice,
  customer,
  onClose,
  onPay,
  autoDownload
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
 
//invoice download compontent
const invoiceRef = useRef<HTMLDivElement>(null);

const handleDownload = async () => {

  if (!invoiceRef.current) return;

  const canvas = await html2canvas(invoiceRef.current, {
    scale: 2
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(`${invoice.invoice_number}.pdf`);
};
  return (
    <div className="invoice-page">

      {/* Toolbar */}
      <div className="invoice-toolbar">

        <button
          className="toolbar-btn"
          onClick={onClose}
        >
          ← Back
        </button>

        <button
          className="toolbar-btn"
          onClick={() => window.print()}
        >
          🖨 Print
        </button>

      </div>

      <div className="invoice-container" ref={invoiceRef}>

        {/* Header */}
        <div className="invoice-header">

          <div>
            <h1>BusinessOS</h1>
            <p>Business Management Software</p>
          </div>

          <div className="invoice-title">
            <h2>INVOICE</h2>

            <span
              className={`status-badge ${invoice.status?.toLowerCase()}`}
            >
              {invoice.status}
            </span>
          </div>

        </div>

        {/* Customer + Invoice Details */}
        <div className="invoice-info">

          <div>
            <h4>Bill To</h4>

            <p>
              <strong>
                {invoice.customer_name || customer?.name}
              </strong>
            </p>

            <p>
              {invoice.customer_email || customer?.email}
            </p>

            <p>
              {invoice.customer_phone || customer?.phone_work}
            </p>
          </div>

          <div className="invoice-meta">

            <div>
              <span>Invoice No</span>
              <strong>{invoice.invoice_number}</strong>
            </div>

            <div>
              <span>Invoice Date</span>
              <strong>{formatDate(invoice.invoice_date)}</strong>
            </div>

            <div>
              <span>Due Date</span>
              <strong>{formatDate(invoice.due_date)}</strong>
            </div>

          </div>

        </div>

        {/* Items */}
        <table className="invoice-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            {invoice.items && invoice.items.length > 0 ? (
  invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.item_name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.rate)}</td>
                  <td>{formatCurrency(item.amount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center" }}
                >
                  No Items Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

        {/* Totals */}
        <div className="invoice-totals">

          <div className="total-row">
            <span>Subtotal</span>
            <strong>
              {formatCurrency(invoice.subtotal)}
            </strong>
          </div>

          <div className="total-row">
            <span>Tax</span>
            <strong>
              {formatCurrency(invoice.tax)}
            </strong>
          </div>

          <div className="total-row grand-total">
            <span>Total</span>
            <strong>
              {formatCurrency(invoice.total)}
            </strong>
          </div>

        </div>

        {/* Footer Actions */}
        <div
  className="invoice-footer-actions"
  data-html2canvas-ignore="true"
>
  <button
    className="btn-secondary"
    onClick={onClose}
  >
    Close
  </button>

  {invoice.status?.toLowerCase() !== "paid" && (
    <button
      className="btn-primary"
      onClick={onPay}
    >
       Pay Invoice
    </button>
  )}

  <button className="btn-download" onClick={handleDownload}>Download Invoice</button>
</div>

      </div>
    </div>
  );
};

export default InvoiceView;