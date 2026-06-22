import React, { useRef } from "react";
import "./ReceiptView.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Payment {
  id: number;
  payment_number?: string;
  payment_date: string;
  payment_method: string;
  reference_number?: string;
  amount: number;

  customer_name?: string;
  customer_email?: string;
}

interface Props {
  payment: Payment;
  customer: any;
  onClose: () => void;
}

const ReceiptView: React.FC<Props> = ({
  payment,
  customer,
  onClose
}) => {

  const receiptRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: customer?.currency || "INR"
    }).format(amount);
  };

  const handleDownload = async () => {
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current, {
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

    pdf.save(`${payment.payment_number || "Receipt"}.pdf`);
  };

  return (
    <div className="receipt-page">

      <div className="receipt-toolbar">
        <button onClick={onClose}>← Back</button>

        <button onClick={() => window.print()}>
          🖨 Print
        </button>

        <button onClick={handleDownload}>
          Download Receipt
        </button>
      </div>

      <div
        className="receipt-container"
        ref={receiptRef}
      >

        <div className="receipt-header">
          <div>
            <h1>BusinessOS</h1>
            <p>Payment Receipt</p>
          </div>

          <div>
            <h2>RECEIPT</h2>
          </div>
        </div>

        <div className="receipt-info">

          <div>
            <h4>Received From</h4>

            <p>
              <strong>
                {payment.customer_name ||
                  customer.name}
              </strong>
            </p>

            <p>
              {payment.customer_email ||
                customer.email}
            </p>
          </div>

          <div>
            <p>
              Receipt No:
              <strong>
                {payment.payment_number || "-"}
              </strong>
            </p>

            <p>
              Date:
              <strong>
                {payment.payment_date}
              </strong>
            </p>

            <p>
              Payment Mode:
              <strong>
                {payment.payment_method}
              </strong>
            </p>
          </div>

        </div>

        <table className="receipt-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Reference</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Customer Payment</td>

              <td>
                {payment.reference_number || "-"}
              </td>

              <td>
                {formatCurrency(payment.amount)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="receipt-total">
          <h3>
            Total Received:
            {formatCurrency(payment.amount)}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default ReceiptView;