// import React, { useEffect, useState } from "react";

// interface InventoryValuationItem {
//   item_name: string;
//   stock: number;
//   purchase_price: number;
//   inventory_value: number;
// }

// export default function InventoryValuationSummary() {
//   const [items, setItems] = useState<InventoryValuationItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/reports/inventory-valuation-summary")
//       .then((res) => res.json())
//       .then((data) => {
//         setItems(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching inventory valuation:", err);
//         setLoading(false);
//       });
//   }, []);

//   const totalStock = items.reduce(
//     (sum, item) => sum + Number(item.stock),
//     0
//   );

//   const totalValue = items.reduce(
//     (sum, item) => sum + Number(item.inventory_value),
//     0
//   );

//   if (loading) {
//     return (
//       <div className="p-6">
//         Loading Inventory Valuation Summary...
//       </div>
//     );
//   }

//   return (
//     <div
//       className="w-full bg-white p-6"
//       style={{ fontFamily: "'Times New Roman', Times, serif" }}
//     >
//       <h1 className="mb-6 text-2xl font-semibold text-gray-900">
//         Inventory Valuation Summary
//       </h1>

//       <div className="overflow-x-auto rounded-lg border border-gray-200">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Item Name
//               </th>
//               <th className="px-4 py-3 text-right text-sm font-semibold">
//                 Stock Qty
//               </th>
//               <th className="px-4 py-3 text-right text-sm font-semibold">
//                 Unit Cost
//               </th>
//               <th className="px-4 py-3 text-right text-sm font-semibold">
//                 Inventory Value
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {items.map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-t border-gray-100"
//               >
//                 <td className="px-4 py-3">
//                   {item.item_name}
//                 </td>

//                 <td className="px-4 py-3 text-right">
//                   {item.stock}
//                 </td>

//                 <td className="px-4 py-3 text-right">
//                   ₹{Number(item.purchase_price).toLocaleString()}
//                 </td>

//                 <td className="px-4 py-3 text-right font-medium">
//                   ₹{Number(item.inventory_value).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//           <tfoot className="bg-gray-50 font-semibold">
//             <tr>
//               <td className="px-4 py-3">
//                 Total
//               </td>

//               <td className="px-4 py-3 text-right">
//                 {totalStock}
//               </td>

//               <td />

//               <td className="px-4 py-3 text-right">
//                 ₹{totalValue.toLocaleString()}
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

interface InventoryValuationItem {
  id: number;
  item_name: string;
  stock: number;
  purchase_price: number;
  inventory_value: number;
}

export default function InventoryValuationSummary() {
  const [items, setItems] = useState<InventoryValuationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reportService.getInventoryValuationSummary();
        setItems(data as InventoryValuationItem[]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const totalStock = items.reduce((sum, item) => sum + Number(item.stock), 0);
  const totalValue = items.reduce((sum, item) => sum + Number(item.inventory_value), 0);

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading Inventory Valuation Summary...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">Error: {error}</div>;
  }

  return (
    <div
      className="w-full bg-white p-6"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Inventory Valuation Summary
      </h1>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No inventory items found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Item Name</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Stock Qty</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Unit Cost</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Inventory Value</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{item.item_name}</td>
                  <td className="px-4 py-3 text-right">{item.stock}</td>
                  <td className="px-4 py-3 text-right">
                    ₹{Number(item.purchase_price).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₹{Number(item.inventory_value).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">{totalStock}</td>
                <td />
                <td className="px-4 py-3 text-right">
                  ₹{totalValue.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}