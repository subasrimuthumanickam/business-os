import React, { useEffect, useState } from "react";
import { vendorService, purchaseOrderService, productService } from "../../services/api.service"; // adjust path

interface VendorOption {
  id: number;
  name: string;
}

interface ProductOption {
  id: number;
  name: string;
  sku: string;
  cost: number;
}

interface POItem {
  product_id: number | null;
  product_name: string;
  quantity: number;
  unit_cost: number;
  amount: number;
}

interface CreatePurchaseOrderProps {
  onClose: () => void;
  onCreated?: () => void;
}

const CreatePurchaseOrder: React.FC<CreatePurchaseOrderProps> = ({ onClose, onCreated }) => {
  const [poNumber, setPoNumber] = useState(`PO-${Math.floor(10000 + Math.random() * 90000)}`);
  const [poDate, setPoDate] = useState(new Date().toISOString().split("T")[0]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [vendors, setVendors] = useState<VendorOption[]>([]);

  const [products, setProducts] = useState<ProductOption[]>([]);
  const [items, setItems] = useState<POItem[]>([
    { product_id: null, product_name: "", quantity: 1, unit_cost: 0, amount: 0 },
  ]);

  const [shippingCharge, setShippingCharge] = useState(0);
  const [customsDuty, setCustomsDuty] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    vendorService.getAll().then((data: any) => setVendors(data));
  }, []);

  // Reuses the existing product search endpoint from CreateInvoice, but
  // fetched once here since PO item rows are typically fewer and the
  // product list is small enough to filter client-side.
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/products/search?q=", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) setProducts(data.data);
  //     })
  //     .catch((err) => console.error("Product fetch failed:", err));
  // }, []);

  useEffect(() => {
  productService.getAll()
    .then((data: any) => setProducts(data))
    .catch((err) => console.error("Product fetch failed:", err));
}, []);
  const handleItemChange = (index: number, field: keyof POItem, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value } as POItem;
    updated[index].amount = Number(updated[index].quantity) * Number(updated[index].unit_cost);
    setItems(updated);
  };

  const handleSelectProduct = (index: number, productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      product_id: product.id,
      product_name: product.name,
      unit_cost: Number(product.cost) || updated[index].unit_cost,
      amount: updated[index].quantity * (Number(product.cost) || updated[index].unit_cost),
    };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { product_id: null, product_name: "", quantity: 1, unit_cost: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + Number(shippingCharge) + Number(customsDuty);

  const handleSave = async () => {
    if (!vendorId) {
      alert("Please select a vendor.");
      return;
    }
    const unlinkedRow = items.findIndex((item) => !item.product_id);
    if (unlinkedRow !== -1) {
      alert(`Please select a product for row ${unlinkedRow + 1}.`);
      return;
    }

    setSaving(true);
    try {
      await purchaseOrderService.create({
        po_number: poNumber,
        vendor_id: vendorId,
        po_date: poDate,
        shipping_charge: shippingCharge,
        customs_duty: customsDuty,
        items: items.map((it) => ({
          product_id: it.product_id,
          quantity: it.quantity,
          unit_cost: it.unit_cost,
        })),
      });
      alert("Purchase Order created!");
      onCreated?.();
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to create purchase order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Purchase Order</h1>
        <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-900">
          Back
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">PO Number</label>
          <input className="w-full rounded border px-3 py-2" value={poNumber} readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PO Date</label>
          <input
            type="date"
            className="w-full rounded border px-3 py-2"
            value={poDate}
            onChange={(e) => setPoDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vendor</label>
          <select
            className="w-full rounded border px-3 py-2"
            value={vendorId ?? ""}
            onChange={(e) => setVendorId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">-- Select Vendor --</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="min-w-full border rounded-lg mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-right">Qty</th>
            <th className="px-4 py-2 text-right">Unit Cost</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">
                <select
                  className="w-full rounded border px-2 py-1"
                  value={item.product_id ?? ""}
                  onChange={(e) => handleSelectProduct(index, Number(e.target.value))}
                >
                  <option value="">-- Select Product --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full rounded border px-2 py-1 text-right"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full rounded border px-2 py-1 text-right"
                  value={item.unit_cost}
                  onChange={(e) => handleItemChange(index, "unit_cost", Number(e.target.value))}
                />
              </td>
              <td className="px-4 py-2 text-right">₹{item.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => removeItem(index)} className="text-red-600 text-sm">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addItem} className="mb-6 text-sm text-blue-600 hover:text-blue-700">
        + Add Item
      </button>

      <div className="max-w-sm ml-auto space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Shipping Charge</span>
          <input
            type="number"
            className="w-32 rounded border px-2 py-1 text-right"
            value={shippingCharge}
            onChange={(e) => setShippingCharge(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Customs Duty</span>
          <input
            type="number"
            className="w-32 rounded border px-2 py-1 text-right"
            value={customsDuty}
            onChange={(e) => setCustomsDuty(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Purchase Order"}
      </button>
    </div>
  );
};

export default CreatePurchaseOrder;