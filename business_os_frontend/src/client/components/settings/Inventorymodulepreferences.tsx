import { useState, useEffect } from 'react';
import inventorySettingsService, {
  InventorySettings,
} from '../../services/Inventorysettings.service';
import warehouseService, { Warehouse, WarehouseInput } from '../../services/Warehouse.service';

type TabId = 'stock' | 'warehouses';

const TABS: { id: TabId; label: string }[] = [
  { id: 'stock', label: 'Stock & Valuation' },
  { id: 'warehouses', label: 'Warehouses' },
];

const VALUATION_METHODS: { value: InventorySettings['valuation_method']; label: string; hint: string }[] = [
  { value: 'FIFO', label: 'FIFO', hint: 'First In, First Out — oldest stock sold first' },
  { value: 'LIFO', label: 'LIFO', hint: 'Last In, First Out — newest stock sold first' },
  { value: 'AVERAGE', label: 'Average Cost', hint: 'Weighted average cost across all stock' },
];

const emptyWarehouseForm: WarehouseInput = {
  warehouse_name: '',
  warehouse_code: '',
  address: '',
  city: '',
};

const InventoryModulePreferences = () => {
  const [activeTab, setActiveTab] = useState<TabId>('stock');

  // ---------- Stock & Valuation state ----------
  const [settings, setSettings] = useState<InventorySettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ---------- Warehouses state ----------
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [warehousesLoading, setWarehousesLoading] = useState(true);
  const [showWarehouseForm, setShowWarehouseForm] = useState(false);
  const [editingWarehouseId, setEditingWarehouseId] = useState<number | null>(null);
  const [warehouseForm, setWarehouseForm] = useState<WarehouseInput>(emptyWarehouseForm);

  const [savedToast, setSavedToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 2500);
  };

  useEffect(() => {
    loadSettings();
    loadWarehouses();
  }, []);

  const loadSettings = async () => {
    try {
      setSettingsLoading(true);
      const data = await inventorySettingsService.getSettings();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load inventory settings:', err);
    } finally {
      setSettingsLoading(false);
    }
  };

  const loadWarehouses = async () => {
    try {
      setWarehousesLoading(true);
      const data = await warehouseService.getAllWarehouses();
      setWarehouses(data);
    } catch (err) {
      console.error('Failed to load warehouses:', err);
    } finally {
      setWarehousesLoading(false);
    }
  };

  const updateField = <K extends keyof InventorySettings>(field: K, value: InventorySettings[K]) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      const updated = await inventorySettingsService.updateSettings(settings);
      setSettings(updated);
      showToast('Settings updated');
    } catch (err) {
      console.error('Failed to save inventory settings:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ============= WAREHOUSE HANDLERS =============
  const openNewWarehouseForm = () => {
    setEditingWarehouseId(null);
    setWarehouseForm(emptyWarehouseForm);
    setShowWarehouseForm(true);
  };

  const openEditWarehouseForm = (wh: Warehouse) => {
    setEditingWarehouseId(wh.id);
    setWarehouseForm({
      warehouse_name: wh.warehouse_name,
      warehouse_code: wh.warehouse_code,
      address: wh.address,
      city: wh.city,
    });
    setShowWarehouseForm(true);
  };

  const handleSaveWarehouse = async () => {
    if (!warehouseForm.warehouse_name.trim() || !warehouseForm.warehouse_code.trim()) {
      alert('Warehouse name and code are required.');
      return;
    }
    try {
      if (editingWarehouseId) {
        await warehouseService.updateWarehouse(editingWarehouseId, warehouseForm);
        showToast('Warehouse updated');
      } else {
        await warehouseService.createWarehouse(warehouseForm);
        showToast('Warehouse created');
      }
      setShowWarehouseForm(false);
      loadWarehouses();
    } catch (err: any) {
      console.error('Failed to save warehouse:', err);
      alert(err?.message || 'Failed to save warehouse.');
    }
  };

  const handleSetDefault = async (wh: Warehouse) => {
    try {
      await warehouseService.setDefaultWarehouse(wh.id);
      showToast(`${wh.warehouse_name} set as default`);
      loadWarehouses();
    } catch (err) {
      console.error('Failed to set default warehouse:', err);
    }
  };

  const handleToggleActive = async (wh: Warehouse) => {
    try {
      await warehouseService.toggleActive(wh.id, !wh.is_active);
      loadWarehouses();
    } catch (err) {
      console.error('Failed to toggle warehouse:', err);
    }
  };

  const handleDeleteWarehouse = async (wh: Warehouse) => {
    if (!window.confirm(`Delete warehouse "${wh.warehouse_name}"?`)) return;
    try {
      await warehouseService.deleteWarehouse(wh.id);
      showToast('Warehouse deleted');
      loadWarehouses();
    } catch (err: any) {
      console.error('Failed to delete warehouse:', err);
      alert(err?.message || 'Failed to delete warehouse.');
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-xl bg-white shadow-sm w-full">
      {savedToast && (
        <div className="absolute -top-3 right-4 z-10 flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {savedToast}
        </div>
      )}

      {/* Top bar - tabs */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-200 flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-6 py-6">
        {/* ============= STOCK & VALUATION TAB ============= */}
        {activeTab === 'stock' && (
          <>
            {settingsLoading || !settings ? (
              <div className="text-sm text-gray-400 py-8 text-center">Loading settings...</div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Stock &amp; valuation</h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Control how stock value is calculated and when you get alerted
                    </p>
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>

                <div className="max-w-xl space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-2">Valuation method</p>
                    <div className="space-y-2">
                      {VALUATION_METHODS.map((method) => (
                        <button
                          key={method.value}
                          onClick={() => updateField('valuation_method', method.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                            settings.valuation_method === method.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <p
                            className={`text-sm font-medium ${
                              settings.valuation_method === method.value ? 'text-blue-700' : 'text-gray-800'
                            }`}
                          >
                            {method.label}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{method.hint}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Low stock alerts</p>
                      <p className="text-xs text-gray-400">Notify when stock falls below threshold</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.enable_low_stock_alerts}
                      onChange={(e) => updateField('enable_low_stock_alerts', e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Default low stock threshold</p>
                      <p className="text-xs text-gray-400">
                        Applies to products without their own threshold set
                      </p>
                    </div>
                    <input
                      type="number"
                      min={0}
                      value={settings.default_low_stock_threshold}
                      onChange={(e) =>
                        updateField('default_low_stock_threshold', Number(e.target.value))
                      }
                      className="w-20 text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Enable auto-reorder</p>
                      <p className="text-xs text-gray-400">
                        Automatically create purchase orders when stock is low
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.enable_auto_reorder}
                      onChange={(e) => updateField('enable_auto_reorder', e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {warehouses.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-800 mb-2">Default warehouse</p>
                      <select
                        value={settings.default_warehouse_id ?? ''}
                        onChange={(e) =>
                          updateField(
                            'default_warehouse_id',
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        className="w-56 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">None selected</option>
                        {warehouses.map((wh) => (
                          <option key={wh.id} value={wh.id}>
                            {wh.warehouse_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ============= WAREHOUSES TAB ============= */}
        {activeTab === 'warehouses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Warehouses</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Manage stock locations across your organization
                </p>
              </div>
              <button
                onClick={openNewWarehouseForm}
                className="text-xs font-medium text-white bg-gray-900 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
              >
                + Add Warehouse
              </button>
            </div>

            {showWarehouseForm && (
              <div className="mb-6 border border-blue-200 bg-blue-50/40 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {editingWarehouseId ? 'Edit warehouse' : 'New warehouse'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Warehouse name</label>
                    <input
                      type="text"
                      value={warehouseForm.warehouse_name}
                      onChange={(e) =>
                        setWarehouseForm({ ...warehouseForm, warehouse_name: e.target.value })
                      }
                      placeholder="e.g. Chennai Main Warehouse"
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Warehouse code</label>
                    <input
                      type="text"
                      value={warehouseForm.warehouse_code}
                      onChange={(e) =>
                        setWarehouseForm({ ...warehouseForm, warehouse_code: e.target.value })
                      }
                      placeholder="e.g. WH-CHN-01"
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">City</label>
                    <input
                      type="text"
                      value={warehouseForm.city ?? ''}
                      onChange={(e) => setWarehouseForm({ ...warehouseForm, city: e.target.value })}
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Address (optional)</label>
                    <input
                      type="text"
                      value={warehouseForm.address ?? ''}
                      onChange={(e) => setWarehouseForm({ ...warehouseForm, address: e.target.value })}
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveWarehouse}
                    className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {editingWarehouseId ? 'Save changes' : 'Create warehouse'}
                  </button>
                  <button
                    onClick={() => setShowWarehouseForm(false)}
                    className="text-xs text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {warehousesLoading ? (
              <div className="text-sm text-gray-400 py-8 text-center">Loading warehouses...</div>
            ) : warehouses.length === 0 ? (
              <div className="text-sm text-gray-400 py-8 text-center">
                No warehouses yet. Click "+ Add Warehouse" to create one.
              </div>
            ) : (
              <div className="space-y-3">
                {warehouses.map((wh) => (
                  <div
                    key={wh.id}
                    className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <path d="M9 22V12h6v10" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                          {wh.warehouse_name}
                          {wh.is_default && (
                            <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                          {!wh.is_active && (
                            <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              Inactive
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {wh.warehouse_code}
                          {wh.city ? ` · ${wh.city}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!wh.is_default && (
                        <button
                          onClick={() => handleSetDefault(wh)}
                          className="text-xs text-gray-600 hover:text-gray-800 font-medium px-3 py-1.5 hover:bg-gray-100 rounded-lg"
                        >
                          Set default
                        </button>
                      )}
                      <input
                        type="checkbox"
                        checked={wh.is_active}
                        onChange={() => handleToggleActive(wh)}
                        title="Active"
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <button
                        onClick={() => openEditWarehouseForm(wh)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1"
                      >
                        Edit
                      </button>
                      {!wh.is_default && (
                        <button
                          onClick={() => handleDeleteWarehouse(wh)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModulePreferences;