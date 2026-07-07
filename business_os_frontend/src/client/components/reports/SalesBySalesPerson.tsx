// import React from "react";

// export default function SalesBySalesPerson() {
//   const salesPersons = [
//     {
//       id: 1,
//       name: "John",
//       invoices: 25,
//       sales: 450000,
//     },
//     {
//       id: 2,
//       name: "David",
//       invoices: 18,
//       sales: 320000,
//     },
//     {
//       id: 3,
//       name: "Sarah",
//       invoices: 30,
//       sales: 580000,
//     },
//     {
//       id: 4,
//       name: "Michael",
//       invoices: 12,
//       sales: 210000,
//     },
//   ];

//   const totalInvoices = salesPersons.reduce(
//     (sum, person) => sum + person.invoices,
//     0
//   );

//   const totalSales = salesPersons.reduce(
//     (sum, person) => sum + person.sales,
//     0
//   );

//   return (
//     <div className="p-6">
//       <h1 className="mb-6 text-2xl font-semibold">
//         Sales by Sales Person
//       </h1>

//       <div className="overflow-x-auto rounded-lg border">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left">
//                 Sales Person
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Invoices
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Average Sales
//               </th>
//               <th className="px-4 py-3 text-right">
//                 Total Sales
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {salesPersons.map((person) => {
//               const averageSales =
//                 person.sales / person.invoices;

//               return (
//                 <tr
//                   key={person.id}
//                   className="border-t"
//                 >
//                   <td className="px-4 py-3">
//                     {person.name}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     {person.invoices}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     ₹{Math.round(
//                       averageSales
//                     ).toLocaleString()}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     ₹{person.sales.toLocaleString()}
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

//               <td className="px-4 py-3 text-right">
//                 {totalInvoices}
//               </td>

//               <td />

//               <td className="px-4 py-3 text-right">
//                 ₹{totalSales.toLocaleString()}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { reportService } from "../../services/api.service"; // adjust path

interface SalesPersonSales {
  id: number | null;
  name: string;
  invoices: number;
  sales: number;
}

export default function SalesBySalesPerson() {
  const [salesPersons, setSalesPersons] = useState<SalesPersonSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reportService.getSalesBySalesPerson();
        setSalesPersons(data as SalesPersonSales[]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const totalInvoices = salesPersons.reduce((sum, p) => sum + p.invoices, 0);
  const totalSales = salesPersons.reduce((sum, p) => sum + p.sales, 0);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading report...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Sales by Sales Person</h1>

      {salesPersons.length === 0 ? (
        <p className="text-sm text-gray-500">No sales data found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Sales Person</th>
                <th className="px-4 py-3 text-right">Invoices</th>
                <th className="px-4 py-3 text-right">Average Sales</th>
                <th className="px-4 py-3 text-right">Total Sales</th>
              </tr>
            </thead>

            <tbody>
              {salesPersons.map((person, idx) => {
                const averageSales = person.invoices > 0 ? person.sales / person.invoices : 0;

                return (
                  <tr key={person.id ?? `unassigned-${idx}`} className="border-t">
                    <td className="px-4 py-3">{person.name}</td>
                    <td className="px-4 py-3 text-right">{person.invoices}</td>
                    <td className="px-4 py-3 text-right">
                      ₹{Math.round(averageSales).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{person.sales.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">{totalInvoices}</td>
                <td />
                <td className="px-4 py-3 text-right">
                  ₹{totalSales.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}