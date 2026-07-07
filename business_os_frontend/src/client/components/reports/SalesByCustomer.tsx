// import React from "react";
// import 

// export default function SalesByCustomer() {
//   const customers = [
//     {
//       id: 1,
//       customer: "ABC Pvt Ltd",
//       invoices: 12,
//       sales: 150000,
//       received: 120000,
//     },
//     {
//       id: 2,
//       customer: "XYZ Traders",
//       invoices: 8,
//       sales: 95000,
//       received: 90000,
//     },
//     {
//       id: 3,
//       customer: "Tech Solutions",
//       invoices: 15,
//       sales: 225000,
//       received: 180000,
//     },
//   ];

//   const totalSales = customers.reduce(
//     (sum, c) => sum + c.sales,
//     0
//   );

//   const totalReceived = customers.reduce(
//     (sum, c) => sum + c.received,
//     0
//   );

//   const totalOutstanding =
//     totalSales - totalReceived;

//   return (
//     <div className="p-6">
//       <h1 className="mb-6 text-2xl font-semibold">
//         Sales by Customer
//       </h1>

//       <div className="overflow-x-auto rounded-lg border">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Invoices
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Sales Amount
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Received
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Outstanding
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {customers.map((customer) => {
//               const outstanding =
//                 customer.sales - customer.received;

//               return (
//                 <tr
//                   key={customer.id}
//                   className="border-t"
//                 >
//                   <td className="px-4 py-3">
//                     {customer.customer}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     {customer.invoices}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     ₹{customer.sales.toLocaleString()}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     ₹{customer.received.toLocaleString()}
//                   </td>

//                   <td className="px-4 py-3 text-right text-red-600">
//                     ₹{outstanding.toLocaleString()}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>

//           <tfoot className="bg-gray-50 font-semibold">
//             <tr>
//               <td className="px-4 py-3">
//                 Total
//               </td>

//               <td />

//               <td className="px-4 py-3 text-right">
//                 ₹{totalSales.toLocaleString()}
//               </td>

//               <td className="px-4 py-3 text-right">
//                 ₹{totalReceived.toLocaleString()}
//               </td>

//               <td className="px-4 py-3 text-right text-red-600">
//                 ₹{totalOutstanding.toLocaleString()}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { reportService } from "../../services/api.service"; // adjust path to match your project

interface CustomerSales {
  id: number;
  customer: string;
  invoices: number;
  sales: number;
  received: number;
  outstanding: number;
}

export default function SalesByCustomer() {
  const [customers, setCustomers] = useState<CustomerSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reportService.getSalesByCustomer();
        setCustomers(data as CustomerSales[]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const totalSales = customers.reduce((sum, c) => sum + c.sales, 0);
  const totalReceived = customers.reduce((sum, c) => sum + c.received, 0);
  const totalOutstanding = totalSales - totalReceived;

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading report...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Sales by Customer</h1>

      {customers.length === 0 ? (
        <p className="text-sm text-gray-500">No sales data found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-right">Invoices</th>
                <th className="px-4 py-3 text-right">Sales Amount</th>
                <th className="px-4 py-3 text-right">Received</th>
                <th className="px-4 py-3 text-right">Outstanding</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="px-4 py-3">{customer.customer}</td>
                  <td className="px-4 py-3 text-right">{customer.invoices}</td>
                  <td className="px-4 py-3 text-right">
                    ₹{customer.sales.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    ₹{customer.received.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600">
                    ₹{customer.outstanding.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-3">Total</td>
                <td />
                <td className="px-4 py-3 text-right">
                  ₹{totalSales.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  ₹{totalReceived.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-red-600">
                  ₹{totalOutstanding.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}