import { useState, useEffect } from 'react';
import financeService, { FinanceSettings as FinanceSettingsType } from '../../services/Finance.service';

type TabId = 'currency' | 'tax' | 'fiscal';

const TABS: { id: TabId; label: string }[] = [
  { id: 'currency', label: 'Currency' },
  { id: 'tax', label: 'Tax' },
  { id: 'fiscal', label: 'Fiscal Year' },
];

const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee (INR)' },
  { code: 'USD', symbol: '$', label: 'US Dollar (USD)' },
  { code: 'EUR', symbol: '€', label: 'Euro (EUR)' },
  { code: 'GBP', symbol: '£', label: 'British Pound (GBP)' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham (AED)' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar (SGD)' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const FinanceSettings = () => {
  const [activeTab, setActiveTab] = useState<TabId>('currency');
  const [settings, setSettings] = useState<FinanceSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await financeService.getSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load finance settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const updateField = <K extends keyof FinanceSettingsType>(
    field: K,
    value: FinanceSettingsType[K]
  ) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleCurrencySelect = (code: string, symbol: string) => {
    if (!settings) return;
    setSettings({ ...settings, base_currency: code, currency_symbol: symbol });
  };

  const handleSave = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      const updated = await financeService.updateSettings(settings);
      setSettings(updated);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err) {
      console.error('Failed to save finance settings:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading finance settings...
      </div>
    );
  }

  // Sample preview number formatted with current settings
  const previewAmount = (12345.6789).toFixed(settings.decimal_places);
  const previewFormatted =
    settings.currency_position === 'before'
      ? `${settings.currency_symbol}${previewAmount}`
      : `${previewAmount}${settings.currency_symbol}`;

  return (
    <div className="relative border border-gray-200 rounded-xl bg-white shadow-sm w-full">
      {savedToast && (
        <div className="absolute -top-3 right-4 z-10 flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          Settings updated
        </div>
      )}

      {/* Top bar - tabs */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
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
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      <div className="px-6 py-6">
        {/* ============= CURRENCY TAB ============= */}
        {activeTab === 'currency' && (
          <div>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900">Currency settings</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Choose the base currency used across invoices, estimates, and reports
              </p>
            </div>

            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">Base currency</p>
                <div className="grid grid-cols-2 gap-2">
                  {CURRENCIES.map((cur) => (
                    <button
                      key={cur.code}
                      onClick={() => handleCurrencySelect(cur.code, cur.symbol)}
                      className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                        settings.base_currency === cur.code
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-2">{cur.symbol}</span>
                      {cur.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Currency symbol position</p>
                  <p className="text-xs text-gray-400">Where the symbol appears relative to the amount</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateField('currency_position', 'before')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      settings.currency_position === 'before'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    ₹100
                  </button>
                  <button
                    onClick={() => updateField('currency_position', 'after')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      settings.currency_position === 'after'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    100₹
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Decimal places</p>
                  <p className="text-xs text-gray-400">Number of digits after the decimal point</p>
                </div>
                <select
                  value={settings.decimal_places}
                  onChange={(e) => updateField('decimal_places', Number(e.target.value))}
                  className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>0</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Preview</p>
                <p className="text-lg font-semibold text-gray-800">{previewFormatted}</p>
              </div>
            </div>
          </div>
        )}

        {/* ============= TAX TAB ============= */}
        {activeTab === 'tax' && (
          <div>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900">Tax settings</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Configure default tax behavior for invoices and estimates
              </p>
            </div>

            <div className="max-w-xl space-y-5">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Default tax rate</p>
                  <p className="text-xs text-gray-400">Applied automatically to new line items</p>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.01}
                    value={settings.default_tax_rate}
                    onChange={(e) => updateField('default_tax_rate', Number(e.target.value))}
                    className="w-20 text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>

              <div className="py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800 mb-2">Tax registration number</p>
                <input
                  type="text"
                  value={settings.tax_registration_number || ''}
                  onChange={(e) => updateField('tax_registration_number', e.target.value)}
                  placeholder="e.g. GSTIN / VAT number"
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Shown on invoices and estimates sent to customers
                </p>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">Tax-inclusive pricing</p>
                  <p className="text-xs text-gray-400">
                    Item prices already include tax (tax is extracted, not added)
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.tax_inclusive_pricing}
                  onChange={(e) => updateField('tax_inclusive_pricing', e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============= FISCAL YEAR TAB ============= */}
        {activeTab === 'fiscal' && (
          <div>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900">Fiscal year</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Defines the start of your financial year for reports and closing books
              </p>
            </div>

            <div className="max-w-xl">
              <p className="text-sm font-medium text-gray-800 mb-2">Fiscal year starts in</p>
              <select
                value={settings.fiscal_year_start_month}
                onChange={(e) => updateField('fiscal_year_start_month', Number(e.target.value))}
                className="w-56 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MONTHS.map((month, idx) => (
                  <option key={month} value={idx + 1}>
                    {month}
                  </option>
                ))}
              </select>

              <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100 mt-5">
                <p className="text-xs text-gray-400 mb-1">Example</p>
                <p className="text-sm text-gray-700">
                  Your fiscal year runs from{' '}
                  <span className="font-medium">
                    {MONTHS[settings.fiscal_year_start_month - 1]} 1
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {MONTHS[(settings.fiscal_year_start_month + 10) % 12]}{' '}
                    {settings.fiscal_year_start_month === 1 ? 31 : 30}
                  </span>{' '}
                  the following year.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceSettings;