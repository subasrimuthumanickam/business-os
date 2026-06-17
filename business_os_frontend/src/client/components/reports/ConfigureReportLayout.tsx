import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TableDensity = 'compact' | 'normal' | 'comfortable';
export type TableDesign = 'default' | 'bordered' | 'alternative_rows' | 'alternative_columns';
export type PageOrientation = 'portrait' | 'landscape';
export type PaperSize = 'a4' | 'letter' | 'legal';
export type MarginSize = 'normal' | 'narrow' | 'wide';

export interface ReportLayoutSettings {
  tableDensity: TableDensity;
  tableDesign: TableDesign;
  orientation: PageOrientation;
  paperSize: PaperSize;
  margin: MarginSize;
  font: string;
  showGeneratedDate: boolean;
  showGeneratedTime: boolean;
}

interface ConfigureReportLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: ReportLayoutSettings) => void;
  initialSettings?: Partial<ReportLayoutSettings>;
}

const DEFAULT_SETTINGS: ReportLayoutSettings = {
  tableDensity: 'normal',
  tableDesign: 'default',
  orientation: 'portrait',
  paperSize: 'a4',
  margin: 'normal',
  font: 'Times New Roman',
  showGeneratedDate: true,
  showGeneratedTime: false,
};

const FONT_OPTIONS = ['Times New Roman', 'Arial', 'Helvetica', 'Georgia', 'Calibri'];

// ---------------------------------------------------------------------------
// Small reusable bits
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 text-sm font-semibold text-gray-900">{children}</h3>;
}

function RadioPill<T extends string>({
  value,
  current,
  label,
  onSelect,
}: {
  value: T;
  current: T;
  label: string;
  onSelect: (v: T) => void;
}) {
  const active = value === current;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
        active
          ? 'border-blue-600 bg-blue-50 text-blue-700'
          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConfigureReportLayout({
  isOpen,
  onClose,
  onSave,
  initialSettings,
}: ConfigureReportLayoutProps) {
  const [settings, setSettings] = useState<ReportLayoutSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });

  if (!isOpen) return null;

  const update = <K extends keyof ReportLayoutSettings>(key: K, value: ReportLayoutSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave?.(settings);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex justify-end bg-black/30"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Configure Report Layout</h2>
          <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* Table Density */}
          <div>
            <SectionLabel>Table Density</SectionLabel>
            <div className="flex gap-2">
              {(['compact', 'normal', 'comfortable'] as TableDensity[]).map((d) => (
                <RadioPill
                  key={d}
                  value={d}
                  current={settings.tableDensity}
                  label={d.charAt(0).toUpperCase() + d.slice(1)}
                  onSelect={(v) => update('tableDensity', v)}
                />
              ))}
            </div>
          </div>

          {/* Table Design */}
          <div>
            <SectionLabel>Table Design</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {([
                ['default', 'Default'],
                ['bordered', 'Bordered'],
                ['alternative_rows', 'Alternative Rows'],
                ['alternative_columns', 'Alternative Columns'],
              ] as [TableDesign, string][]).map(([value, label]) => (
                <RadioPill
                  key={value}
                  value={value}
                  current={settings.tableDesign}
                  label={label}
                  onSelect={(v) => update('tableDesign', v)}
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              Non-default designs won't apply to Business Overview and Tax reports.
            </p>
          </div>

          {/* Orientation */}
          <div>
            <SectionLabel>Page Orientation</SectionLabel>
            <div className="flex gap-2">
              {(['portrait', 'landscape'] as PageOrientation[]).map((o) => (
                <RadioPill
                  key={o}
                  value={o}
                  current={settings.orientation}
                  label={o.charAt(0).toUpperCase() + o.slice(1)}
                  onSelect={(v) => update('orientation', v)}
                />
              ))}
            </div>
          </div>

          {/* Paper size + Margin */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionLabel>Paper Size</SectionLabel>
              <select
                value={settings.paperSize}
                onChange={(e) => update('paperSize', e.target.value as PaperSize)}
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>

            <div>
              <SectionLabel>Margin</SectionLabel>
              <select
                value={settings.margin}
                onChange={(e) => update('margin', e.target.value as MarginSize)}
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="narrow">Narrow</option>
                <option value="normal">Normal</option>
                <option value="wide">Wide</option>
              </select>
            </div>
          </div>

          {/* Font */}
          <div>
            <SectionLabel>Font</SectionLabel>
            <select
              value={settings.font}
              onChange={(e) => update('font', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Generated date / time */}
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Show Generated Date</p>
                <p className="text-xs text-gray-500">Display the date the report was generated.</p>
              </div>
              <Toggle
                checked={settings.showGeneratedDate}
                onChange={(v) => {
                  update('showGeneratedDate', v);
                  if (!v) update('showGeneratedTime', false);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Show Generated Time</p>
                <p className="text-xs text-gray-500">Requires generated date to be enabled.</p>
              </div>
              <Toggle
                checked={settings.showGeneratedTime}
                disabled={!settings.showGeneratedDate}
                onChange={(v) => update('showGeneratedTime', v)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}