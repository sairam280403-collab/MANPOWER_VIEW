'use client';

import React from 'react';
import { Trash2, Calendar, DollarSign, MapPin, Briefcase, User } from 'lucide-react';
import { Employee } from '@/types/employee';
import { getVisaStatus, getVisaStatusColor, formatCurrency, formatDate } from '@/lib/utils';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/lib/utils';

interface EmployeeCardProps {
  employee: Employee;
  onUpdate: (field: keyof Employee, value: any) => void;
  onDelete: () => void;
}

export function EmployeeCard({ employee, onUpdate, onDelete }: EmployeeCardProps) {
  const visaStatus = getVisaStatus(employee.visaExpiration);
  const visaColorClass = getVisaStatusColor(visaStatus);

  const handleEdit = (field: keyof Employee) => {
    const currentValue = employee[field];
    const newValue = prompt(`Edit ${field}:`, String(currentValue || ''));
    
    if (newValue !== null) {
      let value: any = newValue;
      
      if (field === 'salary' || field === 'amountDue') {
        value = parseFloat(newValue) || 0;
      } else if (field === 'sNo') {
        value = parseInt(newValue) || 0;
      }
      
      onUpdate(field, value);
    }
  };

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                #{employee.sNo}
              </span>
            </div>
            <h3 
              onClick={() => handleEdit('name')}
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            >
              {employee.name || 'Click to add name'}
            </h3>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => handleEdit('work')}
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <Briefcase className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Work</p>
              <p className="text-gray-900 dark:text-gray-100">{employee.work || 'N/A'}</p>
            </div>
          </div>

          <div 
            onClick={() => handleEdit('state')}
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">State</p>
              <p className="text-gray-900 dark:text-gray-100">{employee.state || 'N/A'}</p>
            </div>
          </div>

          <div 
            onClick={() => handleEdit('comeBy')}
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Come By</p>
              <p className="text-gray-900 dark:text-gray-100">{employee.comeBy || 'N/A'}</p>
            </div>
          </div>

          <div 
            onClick={() => handleEdit('salary')}
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
              <p className="text-gray-900 dark:text-gray-100 font-medium">
                {employee.salary ? formatCurrency(employee.salary) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
          <div 
            onClick={() => handleEdit('joinedDate')}
            className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <span className="text-gray-500 dark:text-gray-400">Joined Date</span>
            <span className="text-gray-900 dark:text-gray-100">
              {employee.joinedDate ? formatDate(employee.joinedDate) : 'N/A'}
            </span>
          </div>

          <div 
            onClick={() => handleEdit('visaExpiration')}
            className={cn(
              'flex items-center justify-between text-sm cursor-pointer hover:opacity-80 p-2 rounded transition-colors',
              employee.visaExpiration && visaColorClass
            )}
          >
            <span className="font-medium">Visa Expiration</span>
            <span className="font-medium">
              {employee.visaExpiration ? formatDate(employee.visaExpiration) : 'N/A'}
            </span>
          </div>

          <div 
            onClick={() => handleEdit('amountDue')}
            className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <span className="text-gray-500 dark:text-gray-400">Amount Due</span>
            <span className="text-gray-900 dark:text-gray-100 font-semibold">
              {employee.amountDue ? formatCurrency(employee.amountDue) : 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
