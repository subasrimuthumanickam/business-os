import React, { useEffect, useState } from "react";

interface ProductSales {
  item_name: string;
  quantity_sold: number;
  total_sales: number;
  average_price: number;
}

export default function ProductSalesReport() {
  const [products, setProducts] = useState<ProductSales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/product-sales")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalQty = products.reduce(
    (sum, item) => sum + Number(item.quantity_sold),
    0
  );

  const totalSales = products.reduce(
    (sum, item) => sum + Number(item.total_sales),
    0
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Product Sales Report
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Product Name
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
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">
                  {product.item_name}
                </td>

                <td className="px-4 py-3 text-right">
                  {product.quantity_sold}
                </td>

                <td className="px-4 py-3 text-right">
                  ₹{Number(product.average_price).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  ₹{Number(product.total_sales).toLocaleString()}
                </td>
              </tr>
            ))}
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
                ₹{totalSales.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}