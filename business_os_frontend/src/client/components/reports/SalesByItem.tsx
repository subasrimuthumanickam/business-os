import React from "react";

export default function SalesByItem() {
  const items = [
    {
      id: 1,
      item: "Laptop",
      quantity: 15,
      amount: 750000,
    },
    {
      id: 2,
      item: "Keyboard",
      quantity: 40,
      amount: 80000,
    },
    {
      id: 3,
      item: "Mouse",
      quantity: 55,
      amount: 55000,
    },
    {
      id: 4,
      item: "Monitor",
      quantity: 20,
      amount: 240000,
    },
  ];

  const totalQty = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Sales by Item
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Item Name
              </th>
              <th className="px-4 py-3 text-right">
                Quantity Sold
              </th>
              <th className="px-4 py-3 text-right">
                Average Price
              </th>
              <th className="px-4 py-3 text-right">
                Total Sales
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const avgPrice =
                item.amount / item.quantity;

              return (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="px-4 py-3">
                    {item.item}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-3 text-right">
                    ₹{avgPrice.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-right">
                    ₹{item.amount.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td className="px-4 py-3">
                Total
              </td>

              <td className="px-4 py-3 text-right">
                {totalQty}
              </td>

              <td />

              <td className="px-4 py-3 text-right">
                ₹{totalAmount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}