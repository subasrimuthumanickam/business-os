import React, { useState } from "react";
import { vendorService } from "../../services/api.service"; // adjust path

interface CreateVendorProps {
  onClose: () => void;
  onCreated?: () => void;
}

const CreateVendor: React.FC<CreateVendorProps> = ({ onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Vendor name is required.");
      return;
    }

    setSaving(true);
    try {
      await vendorService.create({ name, email, phone, address });
      alert("Vendor created!");
      onCreated?.();
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to create vendor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="mb-6 text-2xl font-semibold">New Vendor</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vendor Name *</label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Vendor"}
        </button>
        <button onClick={onClose} className="rounded border px-4 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateVendor;