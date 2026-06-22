import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadInvoicePDF = async (
  invoiceData: any
) => {

  const element = document.createElement("div");

  element.innerHTML = `
    <div style="padding:40px;font-family:Arial">
      <h1>BusinessOS</h1>

      <h2>INVOICE</h2>

      <p><strong>Invoice No:</strong>
      ${invoiceData.invoice_number}</p>

      <p><strong>Date:</strong>
      ${invoiceData.invoice_date}</p>

      <p><strong>Due Date:</strong>
      ${invoiceData.due_date}</p>

      <hr/>

      <h3>Customer</h3>

      <p>${invoiceData.customer_name || ""}</p>

      <table
        border="1"
        width="100%"
        cellspacing="0"
        cellpadding="10"
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          ${
            invoiceData.items
              ?.map(
                (item: any) => `
              <tr>
                <td>${item.item_name}</td>
                <td>${item.quantity}</td>
                <td>${item.rate}</td>
                <td>${item.amount}</td>
              </tr>
            `
              )
              .join("")
          }
        </tbody>
      </table>

      <h2>Total : ₹${invoiceData.total}</h2>
    </div>
  `;

  document.body.appendChild(element);

  const canvas = await html2canvas(element, {
    scale: 2,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const width = pdf.internal.pageSize.getWidth();

  const height =
    (canvas.height * width) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    width,
    height
  );

  pdf.save(
    `${invoiceData.invoice_number}.pdf`
  );

  document.body.removeChild(element);
};