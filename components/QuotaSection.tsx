'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quota, Employee } from '@/types/employee';
import { calculateQuotaTotal, formatCurrency } from '@/lib/utils';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { EmployeeRow } from './EmployeeRow';

interface QuotaSectionProps {
  quota: Quota;
  onUpdateEmployee: (employeeId: string, field: keyof Employee, value: any) => void;
  onAddEmployee: () => void;
  onDeleteEmployee: (employeeId: string) => void;
  onDeleteQuota: () => void;
}

export function QuotaSection({
  quota,
  onUpdateEmployee,
  onAddEmployee,
  onDeleteEmployee,
  onDeleteQuota,
}: QuotaSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const total = calculateQuotaTotal(quota.employees);

  const handleDeleteQuota = () => {
    // First confirmation
    const firstConfirm = window.confirm(
      `Are you sure you want to delete ${quota.name}?\n\nThis will remove all ${quota.employees.length} employee(s) in this quota.`
    );
    
    if (!firstConfirm) return;
    
    // Second confirmation
    const secondConfirm = window.confirm(
      `⚠️ FINAL WARNING ⚠️\n\nThis action cannot be undone!\n\nDeleting ${quota.name} will permanently remove:\n• ${quota.employees.length} employee record(s)\n• All associated data\n\nConfirm delete?`
    );
    
    if (secondConfirm) {
      onDeleteQuota();
    }
  };

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardHeader className="p-3 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <CardTitle className="text-base sm:text-xl">{quota.name}</CardTitle>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              ({quota.employees.length})
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2">
            <div className="w-full sm:w-auto text-left sm:text-right sm:mr-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Due</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(total)}
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                onClick={onAddEmployee}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs sm:text-sm px-4 sm:px-4 py-2 sm:py-2"
              >
                <Plus className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>Add</span>
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteQuota}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs sm:text-sm px-4 sm:px-4 py-2 sm:py-2"
              >
                <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-0">
              {/* Desktop: Full table, no scroll */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">S.No</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Work</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Come By</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">State</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Salary</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Joined</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Visa Exp</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Amount Due</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {quota.employees.map((employee) => (
                      <EmployeeRow
                        key={employee.id}
                        employee={employee}
                        onUpdate={(field, value) => onUpdateEmployee(employee.id, field, value)}
                        onDelete={() => onDeleteEmployee(employee.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet: Compact table with horizontal scroll */}
              <div className="lg:hidden overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">No</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Name</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Work</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Come By</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">State</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Salary</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Joined</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Visa</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Due</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">Act</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {quota.employees.map((employee) => (
                      <EmployeeRow
                        key={employee.id}
                        employee={employee}
                        onUpdate={(field, value) => onUpdateEmployee(employee.id, field, value)}
                        onDelete={() => onDeleteEmployee(employee.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Made with Bob
