'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '@/types/employee';
import { Button } from './ui/Button';

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  states: string[];
  workTypes: string[];
}

export function FilterBar({ filters, onChange, states, workTypes }: FilterBarProps) {
  const hasActiveFilters = filters.state !== '' || filters.work !== '';

  const clearFilters = () => {
    onChange({ state: '', work: '' });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Filter className="w-5 h-5" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <select
        value={filters.state}
        onChange={(e) => onChange({ ...filters, state: e.target.value })}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All States</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={filters.work}
        onChange={(e) => onChange({ ...filters, work: e.target.value })}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Work Types</option>
        {workTypes.map((work) => (
          <option key={work} value={work}>
            {work}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>
      )}
    </div>
  );
}

// Made with Bob
