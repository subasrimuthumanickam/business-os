import React from 'react';
import { X } from 'lucide-react';

export interface NewItemFormState {
  type: 'goods' | 'service';
  name: string;
  unit: string;
  sku: string;
  category: string;
  price: number;       // Sales Rate
  sales_account: string;
  cost: number;         // Purchase Rate
  purchase_account: string;
  description: string;
  purchase_description: string;
  tax_preference: 'taxable' | 'non-taxable';
}

interface NewItemFormProps {
  form: NewItemFormState;
  errors: Record<string, string>;
  categories: { id: number | string; name: string }[];
  loading?: boolean;
  onChange: (field: keyof NewItemFormState, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const SALES_ACCOUNT_OPTIONS = ['Sales', 'Other Income', 'Service Income'];
const PURCHASE_ACCOUNT_OPTIONS = ['Cost of Goods Sold', 'Inventory Asset', 'Purchases'];
const UNIT_OPTIONS = ['pcs', 'kg', 'g', 'litre', 'ml', 'box', 'pack', 'dozen', 'set', 'unit'];

/**
 * New Item form — mirrors Zoho Books' "New Item" panel:
 * Goods/Service radio at top, Name + Unit, then Sales Information
 * and Purchase Information side-by-side below.
 *
 * Sales Rate binds to `price`, Purchase Rate binds to `cost` —
 * the two fields that already exist on the real schema.
 * sales_account / purchase_account / tax_preference are UI-only
 * until the backend columns exist (see Inventory.types.ts notes).
 */
export const NewItemForm: React.FC<NewItemFormProps> = ({
  form,
  errors,
  categories,
  loading = false,
  onChange,
  onCancel,
  onSubmit,
}) => {
  const isGoods = form.type === 'goods';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">New Item</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Type toggle */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-700">Type</span>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="item-type"
              checked={isGoods}
              onChange={() => onChange('type', 'goods')}
              className="text-blue-600 focus:ring-blue-500"
            />
            Goods
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="item-type"
              checked={!isGoods}
              onChange={() => onChange('type', 'service')}
              className="text-blue-600 focus:ring-blue-500"
            />
            Service
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-red-500 mb-1">Name*</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Apple TV 4K 64GB"
            className={`w-full px-3 py-2 border rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-red-500 mb-1">SKU*</label>
            <input
              type="text"
              value={form.sku}
              onChange={(e) => onChange('sku', e.target.value)}
              placeholder="12-digit SKU"
              className={`w-full px-3 py-2 border rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.sku ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku}</p>}
          </div>

          {/* Unit — fixed dropdown, not free text, so stray values (e.g. a typed
              quantity) can never end up stored as the unit again */}
          {isGoods && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select
                value={form.unit}
                onChange={(e) => onChange('unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {UNIT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-red-500 mb-1">Category*</label>
          <select
            value={form.category}
            onChange={(e) => onChange('category', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md outline-none text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? 'border-red-400' : 'border-gray-300'
            }`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        {/* Tax Preference */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-700">Tax Preference</span>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="tax-pref"
              checked={form.tax_preference === 'taxable'}
              onChange={() => onChange('tax_preference', 'taxable')}
              className="text-blue-600 focus:ring-blue-500"
            />
            Taxable
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="tax-pref"
              checked={form.tax_preference === 'non-taxable'}
              onChange={() => onChange('tax_preference', 'non-taxable')}
              className="text-blue-600 focus:ring-blue-500"
            />
            Non-Taxable
          </label>
        </div>

        {/* Sales Info / Purchase Info — side by side, Zoho style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-gray-100">
          {/* Sales Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Sales Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-red-500 mb-1">Selling Price*</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-2.5 py-2 text-xs text-gray-500 bg-gray-50 border-r border-gray-300">₹</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => onChange('price', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm outline-none"
                  />
                </div>
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Sales Account</label>
                <select
                  value={form.sales_account}
                  onChange={(e) => onChange('sales_account', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {SALES_ACCOUNT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => onChange('description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Purchase Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-red-500 mb-1">Purchase Rate*</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-2.5 py-2 text-xs text-gray-500 bg-gray-50 border-r border-gray-300">₹</span>
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) => onChange('cost', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm outline-none"
                  />
                </div>
                {errors.cost && <p className="text-xs text-red-500 mt-1">{errors.cost}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Purchase Account</label>
                <select
                  value={form.purchase_account}
                  onChange={(e) => onChange('purchase_account', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {PURCHASE_ACCOUNT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.purchase_description}
                  onChange={(e) => onChange('purchase_description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewItemForm;