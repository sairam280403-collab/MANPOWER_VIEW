'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import toast from 'react-hot-toast';
import type { Quota } from '@/types/employee';

interface ImportCSVProps {
  onImport: (quotas: Quota[]) => void;
  onClose: () => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function parseCSVData(csvContent: string): Quota[] {
  const lines = csvContent.split('\n');
  const quotas: Quota[] = [];
  let currentQuota: Quota | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if this is a quota header
    if (line.startsWith('Quota ')) {
      // Save previous quota if exists
      if (currentQuota && currentQuota.employees.length > 0) {
        quotas.push(currentQuota);
      }
      
      // Start new quota
      currentQuota = {
        id: generateId(),
        name: line,
        employees: []
      };
      
      // Skip the next line (header row)
      i++;
      continue;
    }
    
    // Parse employee data
    if (currentQuota && line.includes(',')) {
      // Parse CSV line (handle quoted fields)
      const fields: string[] = [];
      let currentField = '';
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      fields.push(currentField.trim());
      
      // Extract employee data
      const [, name, work, comeBy, state, salary, joinedDate, visaExpiration, amountDue] = fields;
      
      // Skip if name is empty
      if (!name || name === '') continue;
      
      currentQuota.employees.push({
        id: generateId(),
        sNo: currentQuota.employees.length + 1,
        name: name || '',
        work: work || '',
        comeBy: comeBy || '',
        state: state || '',
        salary: parseFloat(salary) || 0,
        joinedDate: joinedDate || '',
        visaExpiration: visaExpiration || '',
        amountDue: parseFloat(amountDue) || 0
      });
    }
  }
  
  // Add the last quota
  if (currentQuota && currentQuota.employees.length > 0) {
    quotas.push(currentQuota);
  }
  
  return quotas;
}

export function ImportCSV({ onImport, onClose }: ImportCSVProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Quota[] | null>(null);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError('');
    
    // Check file type
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      setPreview(null);
      return;
    }
    
    try {
      const text = await selectedFile.text();
      const parsedQuotas = parseCSVData(text);
      
      if (parsedQuotas.length === 0) {
        setError('No valid data found in CSV file');
        setPreview(null);
        return;
      }
      
      setPreview(parsedQuotas);
    } catch (err) {
      setError('Error reading CSV file');
      setPreview(null);
      console.error(err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImport = () => {
    if (preview) {
      onImport(preview);
      toast.success(`Imported ${preview.length} quotas successfully!`);
      onClose();
    }
  };

  const totalEmployees = preview?.reduce((sum, quota) => sum + quota.employees.length, 0) || 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Import CSV Data
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* File Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Drop your CSV file here or click to browse
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="inline-block">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                Select CSV File
              </span>
            </label>
          </div>

          {/* Selected File */}
          {file && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {file.name}
                </span>
              </div>
              {preview && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h3>
              <div className="space-y-3">
                {preview.map((quota, index) => (
                  <div
                    key={quota.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {quota.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {quota.employees.length} employees
                      </span>
                    </div>
                    {quota.employees.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <p className="truncate">
                          {quota.employees.slice(0, 3).map(e => e.name).join(', ')}
                          {quota.employees.length > 3 && '...'}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Total: {preview.length} quotas, {totalEmployees} employees
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Button
              onClick={handleImport}
              disabled={!preview}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              CSV Format Requirements:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• File must have "Quota 1", "Quota 2", etc. as section headers</li>
              <li>• Each quota section should have a header row with column names</li>
              <li>• Columns: S.No, Name, Work, Come By, State, Salary, Joined Date, Visa Expiration, Amount Due</li>
              <li>• Empty rows will be skipped</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
