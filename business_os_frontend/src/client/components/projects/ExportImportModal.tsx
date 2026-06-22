// src/client/components/projects/ExportImportModal.tsx
import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  FileText,
  Shield,
  Lock,
  Check,
  AlertCircle
} from 'lucide-react';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'export' | 'import';
  onExport?: (format: string, includePII: boolean, password?: string) => void;
  onImport?: (file: File) => void;
}

const ExportImportModal: React.FC<ExportImportModalProps> = ({ 
  isOpen, 
  onClose, 
  type,
  onExport,
  onImport
}) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [includePII, setIncludePII] = useState(false);
  const [passwordProtect, setPasswordProtect] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(exportFormat, includePII, passwordProtect ? password : undefined);
    }
    onClose();
  };

  const handleImport = () => {
    if (selectedFile && onImport) {
      onImport(selectedFile);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              {type === 'export' ? (
                <Download className="w-5 h-5 mr-2 text-blue-600" />
              ) : (
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {type === 'export' ? 'Export Projects' : 'Import Projects'}
            </h3>
            <p className="text-sm text-gray-500">
              {type === 'export' 
                ? 'Export your project data in CSV or XLS format'
                : 'Import project data from CSV or XLS file'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {type === 'export' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Module <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="projects">Projects</option>
                  <option value="tasks">Tasks</option>
                  <option value="time_entries">Time Entries</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Export Format <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    className={`px-3 py-2 border rounded-lg text-sm flex items-center justify-center transition ${
                      exportFormat === 'csv' 
                        ? 'border-blue-500 bg-blue-50 text-blue-600' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setExportFormat('csv')}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    CSV
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-2 border rounded-lg text-sm flex items-center justify-center transition ${
                      exportFormat === 'xls' 
                        ? 'border-blue-500 bg-blue-50 text-blue-600' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setExportFormat('xls')}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    XLS
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-2 border rounded-lg text-sm flex items-center justify-center transition ${
                      exportFormat === 'xlsx' 
                        ? 'border-blue-500 bg-blue-50 text-blue-600' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setExportFormat('xlsx')}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    XLSX
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={includePII}
                    onChange={(e) => setIncludePII(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">
                    Include Sensitive Personally Identifiable Information (PII)
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={passwordProtect}
                    onChange={(e) => setPasswordProtect(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">Password protect the file</span>
                </label>
                {passwordProtect && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-700">
                    <p className="font-medium">Note:</p>
                    <p>You can export only the first 25,000 rows. If you have more rows, please initiate a backup for the data in your organization.</p>
                    <button className="text-blue-600 hover:text-blue-700 mt-1 font-medium">
                      Backup Your Data →
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Drag and drop or click to upload'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported formats: CSV, XLS, XLSX (Max: 10MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileChange}
                    id="file-upload"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Choose File
                  </button>
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="mt-2 ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium">File Requirements:</p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>File should be in CSV or XLS format</li>
                      <li>Maximum file size: 10MB</li>
                      <li>Required columns: Project Name, Customer Name</li>
                      <li>Optional columns: Description, Budget, Rate</li>
                    </ul>
                  </div>
                </div>
              </div>

              {selectedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700">
                      File ready to import: {selectedFile.name}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={type === 'export' ? handleExport : handleImport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            {type === 'export' ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportImportModal;