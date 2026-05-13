'use client';

import React, { useState } from 'react';
import { Trash2, Check, X } from 'lucide-react';
import { Employee } from '@/types/employee';
import { getVisaStatus, getVisaStatusColor, formatCurrency, formatDate } from '@/lib/utils';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface EmployeeRowProps {
  employee: Employee;
  onUpdate: (field: keyof Employee, value: any) => void;
  onDelete: () => void;
}

export function EmployeeRow({ employee, onUpdate, onDelete }: EmployeeRowProps) {
  const [editingField, setEditingField] = useState<keyof Employee | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const startEdit = (field: keyof Employee, currentValue: any) => {
    setEditingField(field);
    setTempValue(String(currentValue || ''));
  };

  const saveEdit = () => {
    if (editingField) {
      let value: any = tempValue;
      
      if (editingField === 'salary' || editingField === 'amountDue') {
        value = parseFloat(tempValue) || 0;
      } else if (editingField === 'sNo') {
        value = parseInt(tempValue) || 0;
      }
      
      onUpdate(editingField, value);
      setEditingField(null);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const visaStatus = getVisaStatus(employee.visaExpiration);
  const visaColorClass = getVisaStatusColor(visaStatus);

  const renderCell = (field: keyof Employee, value: any, type: 'text' | 'number' | 'date' = 'text') => {
    const isEditing = editingField === field;

    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          <input
            type={type}
            step={type === 'number' ? '0.01' : undefined}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-1 py-0.5 lg:px-2 lg:py-1 text-xs lg:text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            autoFocus
          />
          <button onClick={saveEdit} className="text-green-600 hover:text-green-700 p-0.5 flex-shrink-0">
            <Check className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
          <button onClick={cancelEdit} className="text-red-600 hover:text-red-700 p-0.5 flex-shrink-0">
            <X className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
        </div>
      );
    }

    return (
      <div
        onClick={() => startEdit(field, value)}
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 lg:px-2 lg:py-1 rounded transition-colors min-h-[24px] lg:min-h-[32px] flex items-center"
      >
        {value || <span className="text-gray-400 text-xs lg:text-sm">Edit</span>}
      </div>
    );
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* S.No */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        <div className="font-medium">{employee.sNo}</div>
      </td>
      
      {/* Name */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {renderCell('name', employee.name)}
      </td>
      
      {/* Work */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {renderCell('work', employee.work)}
      </td>
      
      {/* Come By */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {renderCell('comeBy', employee.comeBy)}
      </td>
      
      {/* State */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {renderCell('state', employee.state)}
      </td>
      
      {/* Salary */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {editingField === 'salary' ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="0.01"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-1 py-0.5 lg:px-2 lg:py-1 text-xs lg:text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button onClick={saveEdit} className="text-green-600 hover:text-green-700 p-0.5 flex-shrink-0">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <button onClick={cancelEdit} className="text-red-600 hover:text-red-700 p-0.5 flex-shrink-0">
              <X className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => startEdit('salary', employee.salary)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 lg:px-2 lg:py-1 rounded transition-colors min-h-[24px] lg:min-h-[32px] flex items-center"
          >
            {employee.salary ? formatCurrency(employee.salary) : <span className="text-gray-400 text-xs lg:text-sm">Edit</span>}
          </div>
        )}
      </td>
      
      {/* Joined Date */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {editingField === 'joinedDate' ? (
          <div className="flex items-center gap-1">
            <input
              type="date"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-1 py-0.5 lg:px-2 lg:py-1 text-xs lg:text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button onClick={saveEdit} className="text-green-600 hover:text-green-700 p-0.5 flex-shrink-0">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <button onClick={cancelEdit} className="text-red-600 hover:text-red-700 p-0.5 flex-shrink-0">
              <X className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => startEdit('joinedDate', employee.joinedDate)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 lg:px-2 lg:py-1 rounded transition-colors min-h-[24px] lg:min-h-[32px] flex items-center"
          >
            {employee.joinedDate ? formatDate(employee.joinedDate) : <span className="text-gray-400 text-xs lg:text-sm">Edit</span>}
          </div>
        )}
      </td>
      
      {/* Visa Expiration */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm whitespace-nowrap">
        {editingField === 'visaExpiration' ? (
          <div className="flex items-center gap-1">
            <input
              type="date"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-1 py-0.5 lg:px-2 lg:py-1 text-xs lg:text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button onClick={saveEdit} className="text-green-600 hover:text-green-700 p-0.5 flex-shrink-0">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <button onClick={cancelEdit} className="text-red-600 hover:text-red-700 p-0.5 flex-shrink-0">
              <X className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => startEdit('visaExpiration', employee.visaExpiration)}
            className={cn(
              'cursor-pointer hover:opacity-80 px-1 py-0.5 lg:px-2 lg:py-1 rounded transition-colors min-h-[24px] lg:min-h-[32px] flex items-center',
              employee.visaExpiration && visaColorClass
            )}
          >
            {employee.visaExpiration ? formatDate(employee.visaExpiration) : <span className="text-gray-400 text-xs lg:text-sm">Edit</span>}
          </div>
        )}
      </td>
      
      {/* Amount Due */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {editingField === 'amountDue' ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="0.01"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-1 py-0.5 lg:px-2 lg:py-1 text-xs lg:text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button onClick={saveEdit} className="text-green-600 hover:text-green-700 p-0.5 flex-shrink-0">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <button onClick={cancelEdit} className="text-red-600 hover:text-red-700 p-0.5 flex-shrink-0">
              <X className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => startEdit('amountDue', employee.amountDue)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 lg:px-2 lg:py-1 rounded transition-colors min-h-[24px] lg:min-h-[32px] flex items-center font-medium"
          >
            {employee.amountDue ? formatCurrency(employee.amountDue) : <span className="text-gray-400 text-xs lg:text-sm">Edit</span>}
          </div>
        )}
      </td>
      
      {/* Actions */}
      <td className="px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm whitespace-nowrap">
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          className="flex items-center gap-1 px-1.5 py-1 lg:px-2 lg:py-1.5"
        >
          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
        </Button>
      </td>
    </tr>
  );
}

// Made with Bob
