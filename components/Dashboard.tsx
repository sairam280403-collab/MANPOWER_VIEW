'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Users, DollarSign, AlertTriangle, TrendingUp, Download, Plus, Upload } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { calculateDashboardStats, formatCurrency } from '@/lib/utils';
import { exportToExcel, exportToCSV } from '@/lib/exportUtils';
import { FilterOptions, Quota } from '@/types/employee';
import { StatCard } from './StatCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { QuotaSection } from './QuotaSection';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { ImportCSV } from './ImportCSV';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { quotas, updateEmployee, addEmployee, deleteEmployee, addQuota, deleteQuota, mounted, loading, error, refetch, setQuotas } = useEmployeeData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({ state: '', work: '' });
  const [showImport, setShowImport] = useState(false);

  const stats = useMemo(() => calculateDashboardStats(quotas), [quotas]);

  const filteredQuotas = useMemo(() => {
    return quotas.map(quota => ({
      ...quota,
      employees: quota.employees.filter(emp => {
        const matchesSearch = 
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.work.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesState = !filters.state || emp.state === filters.state;
        const matchesWork = !filters.work || emp.work === filters.work;
        
        return matchesSearch && matchesState && matchesWork;
      }),
    })).filter(quota => quota.employees.length > 0);
  }, [quotas, searchQuery, filters]);

  const allStates = useMemo(() => {
    const states = new Set<string>();
    quotas.forEach(quota => {
      quota.employees.forEach(emp => {
        if (emp.state) states.add(emp.state);
      });
    });
    return Array.from(states).sort();
  }, [quotas]);

  const allWorkTypes = useMemo(() => {
    const workTypes = new Set<string>();
    quotas.forEach(quota => {
      quota.employees.forEach(emp => {
        if (emp.work) workTypes.add(emp.work);
      });
    });
    return Array.from(workTypes).sort();
  }, [quotas]);

  const handleExportExcel = () => {
    exportToExcel(quotas);
    toast.success('Data exported to Excel successfully!');
  };

  const handleExportCSV = () => {
    exportToCSV(quotas);
    toast.success('Data exported to CSV successfully!');
  };

  const handleImportCSV = (importedQuotas: Quota[]) => {
    setQuotas(importedQuotas);
    toast.success(`Imported ${importedQuotas.length} quotas successfully!`);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading data from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Failed to Load Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <Button onClick={refetch} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Manpower Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Employee & Account Dashboard
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Total Salary"
            value={formatCurrency(stats.totalSalary)}
            icon={DollarSign}
            color="green"
            delay={0.1}
          />
          <StatCard
            title="Total Amount Due"
            value={formatCurrency(stats.totalAmountDue)}
            icon={TrendingUp}
            color="yellow"
            delay={0.2}
          />
          <StatCard
            title="Visa Alerts"
            value={stats.upcomingExpirations}
            icon={AlertTriangle}
            color="red"
            delay={0.3}
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, state, or work type..."
              />
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowImport(true)}
                className="flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
              >
                <Upload className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>Import</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportExcel}
                className="flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
              >
                <Download className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>Excel</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
              >
                <Download className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>CSV</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={addQuota}
                className="flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
              >
                <Plus className="w-4 h-4 sm:w-4 sm:h-4" />
                <span>Add Quota</span>
              </Button>
            </div>
          </div>
          
          <FilterBar
            filters={filters}
            onChange={setFilters}
            states={allStates}
            workTypes={allWorkTypes}
          />
        </div>

        {/* Quota Sections */}
        <div className="space-y-3 sm:space-y-6">
          {filteredQuotas.length > 0 ? (
            filteredQuotas.map((quota) => (
              <QuotaSection
                key={quota.id}
                quota={quota}
                onUpdateEmployee={(employeeId, field, value) =>
                  updateEmployee(quota.id, employeeId, field, value)
                }
                onAddEmployee={() => addEmployee(quota.id)}
                onDeleteEmployee={(employeeId) => deleteEmployee(quota.id, employeeId)}
                onDeleteQuota={() => deleteQuota(quota.id)}
              />
            ))
          ) : (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No employees found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || filters.state || filters.work
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding employees to your quotas'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 Manpower Management System. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Import CSV Modal */}
      {showImport && (
        <ImportCSV
          onImport={handleImportCSV}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
}

// Made with Bob
