import React, { useState, useEffect } from 'react';
import {
  Edit, Trash2, MoreVertical, Package, Plus, Minus,
  Tag, FileText, Clock as ClockIcon, FileSpreadsheet, ShoppingCart, Receipt
} from 'lucide-react';
import { Product, ProductTransaction } from '../../types/Inventory.types';
import { InventoryService } from '../../services/inventory.service';

interface ItemDetailPaneProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onAddStock: () => void;
  onRemoveStock: () => void;
}

type DetailTab = 'overview' | 'transactions' | 'history';

/**
 * Right pane of the Zoho-style master-detail Inventory layout.
 * Mirrors Zoho Books' Item overview: tab bar (Overview / Transactions /
 * History) and a two-column Sales Information / Purchase Information card.
 *
 * sales_account / purchase_account / tax_preference / type are now real
 * DB columns (see migration 2026_06_25_add_zoho_fields_to_products.sql).
 * Selling Price reads from `price`, Purchase Rate from `cost`.
 *
 * Transactions tab pulls real Invoice / Estimate / Sales Order line items
 * referencing this product via GET /products/:id/transactions. Invoices
 * may under-report until invoice_items.product_id starts getting
 * populated on save (separate follow-up, see
 * 2026_06_25_add_product_id_to_invoice_items.sql notes).
 */
export const ItemDetailPane: React.FC<ItemDetailPaneProps> = ({
  product,
  onEdit,
  onDelete,
  onAddStock,
  onRemoveStock,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<ProductTransaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);

  const isGoods = (product.type ?? 'goods') === 'goods';

  useEffect(() => {
    if (activeTab !== 'transactions') return;

    let cancelled = false;
    setTransactionsLoading(true);
    setTransactionsError(null);

    InventoryService.getInstance()
      .getProductTransactions(product.id)
      .then((data) => {
        if (!cancelled) setTransactions(data);
      })
      .catch((err) => {
        console.error('Failed to load transactions:', err);
        if (!cancelled) setTransactionsError('Could not load transactions. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setTransactionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab, product.id]);

  const tabs: { key: DetailTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'history', label: 'History' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-200">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
          <span
            className={`shrink-0 px-2 py-0.5 text-[11px] font-medium rounded-full ${
              product.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {product.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onAddStock}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors"
          >
            <Plus size={13} /> Add Stock
          </button>
          <button
            onClick={onRemoveStock}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 border border-orange-200 rounded-md hover:bg-orange-100 transition-colors"
          >
            <Minus size={13} /> Remove Stock
          </button>
          <button
            onClick={onEdit}
            className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            title="Edit"
          >
            <Edit size={15} />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              title="More"
            >
              <MoreVertical size={15} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onAddStock();
                  }}
                  className="sm:hidden w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={14} /> Add Stock
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onRemoveStock();
                  }}
                  className="sm:hidden w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Minus size={14} /> Remove Stock
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-5 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'overview' && (
          <div className="space-y-5 max-w-2xl">
            {/* Top facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                  Item Type
                </label>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {isGoods ? 'Goods' : 'Service'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                  SKU
                </label>
                <p className="text-sm font-semibold text-gray-900 mt-0.5 font-mono truncate">
                  {product.sku}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                  Unit
                </label>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{product.unit || '—'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                  Tax Preference
                </label>
                <p className="text-sm font-semibold text-gray-900 mt-0.5 capitalize">
                  {product.tax_preference?.replace('-', ' ') || 'Not set'}
                </p>
              </div>
            </div>

            {/* Stock row — only for Goods */}
            {isGoods && (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                    On Hand
                  </label>
                  <p className="text-lg font-bold text-blue-700">
                    {product.onHand ?? product.stock_quantity ?? 0}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                    Available
                  </label>
                  <p className="text-lg font-bold text-green-700">{product.available ?? 0}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                    On Hold
                  </label>
                  <p className="text-lg font-bold text-orange-700">{product.onHold ?? 0}</p>
                </div>
              </div>
            )}

            {/* Sales Info + Purchase Info — Zoho-style two column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                  <Tag size={14} className="text-gray-400" /> Sales Information
                </h3>
                <dl className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-gray-500">Selling Price</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      ₹{(product.price ?? 0).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-gray-500">Sales Account</dt>
                    <dd className="text-sm text-gray-700">
                      {product.sales_account || (
                        <span className="text-gray-400 italic">Not set</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                  <Tag size={14} className="text-gray-400" /> Purchase Information
                </h3>
                <dl className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-gray-500">Purchase Rate</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      ₹{(product.cost ?? 0).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-gray-500">Purchase Account</dt>
                    <dd className="text-sm text-gray-700">
                      {product.purchase_account || (
                        <span className="text-gray-400 italic">Not set</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-2">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                  Description
                </label>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            {transactionsLoading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText size={36} className="text-gray-300 mb-3 animate-pulse" />
                <p className="text-sm text-gray-500">Loading transactions...</p>
              </div>
            )}

            {!transactionsLoading && transactionsError && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText size={36} className="text-red-300 mb-3" />
                <h3 className="text-sm font-medium text-red-600">{transactionsError}</h3>
              </div>
            )}

            {!transactionsLoading && !transactionsError && transactions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText size={36} className="text-gray-300 mb-3" />
                <h3 className="text-sm font-medium text-gray-600">No transactions yet</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Invoices, estimates, and sales orders involving this item will show up here.
                </p>
              </div>
            )}

            {!transactionsLoading && !transactionsError && transactions.length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Number</th>
                      <th className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-2 text-right text-[11px] font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-3 py-2 text-right text-[11px] font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((txn) => (
                      <tr key={`${txn.type}-${txn.id}`} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                            {txn.type === 'invoice' && <Receipt size={12} className="text-blue-500" />}
                            {txn.type === 'estimate' && <FileSpreadsheet size={12} className="text-purple-500" />}
                            {txn.type === 'sales_order' && <ShoppingCart size={12} className="text-emerald-500" />}
                            {txn.type === 'invoice' ? 'Invoice' : txn.type === 'estimate' ? 'Estimate' : 'Sales Order'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs font-medium text-gray-800">{txn.number}</td>
                        <td className="px-3 py-2 text-xs text-gray-600">{txn.customer_name}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">
                          {txn.date ? new Date(txn.date).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-600 capitalize">
                            {txn.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-right text-gray-700">{txn.quantity}</td>
                        <td className="px-3 py-2 text-xs text-right font-medium text-gray-800">
                          ₹{Number(txn.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClockIcon size={36} className="text-gray-300 mb-3" />
            <h3 className="text-sm font-medium text-gray-600">No history yet</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs">
              Stock movements and item edits will be logged here once stock_movements is wired in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPane;