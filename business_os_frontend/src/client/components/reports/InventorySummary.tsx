import React, { useEffect, useState } from "react";

interface InventoryItem {
  id: number;
  item_name: string;
  sku: string;
  quantity_on_hand: number;
  unit_price: number;
  stock_value: number;
}

export default function InventorySummary() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/inventory-summary")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalQty = items.reduce(
    (sum, item) => sum + Number(item.quantity_on_hand),
    0
  );

  const totalValue = items.reduce(
    (sum, item) => sum + Number(item.stock_value),
    0
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Inventory Summary
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Unit Cost</th>
              <th className="px-4 py-3 text-right">Stock Value</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">
                  {item.item_name}
                </td>

                <td className="px-4 py-3">
                  {item.sku}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.quantity_on_hand}
                </td>

                <td className="px-4 py-3 text-right">
                  ₹{Number(item.unit_price).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right">
                  ₹{Number(item.stock_value).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.quantity_on_hand > 10 ? (
                    <span className="text-green-600">
                      In Stock
                    </span>
                  ) : item.quantity_on_hand > 0 ? (
                    <span className="text-yellow-600">
                      Low Stock
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Out of Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td colSpan={2} className="px-4 py-3">
                Total
              </td>

              <td className="px-4 py-3 text-right">
                {totalQty}
              </td>

              <td />

              <td className="px-4 py-3 text-right">
                ₹{totalValue.toLocaleString()}
              </td>

              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}