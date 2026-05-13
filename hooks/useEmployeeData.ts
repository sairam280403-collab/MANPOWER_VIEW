'use client';

import { useState, useEffect } from 'react';
import { Quota, Employee } from '@/types/employee';
import { saveToLocalStorage, loadFromLocalStorage, createEmptyEmployee, generateId } from '@/lib/utils';
import { createInitialQuotas } from '@/lib/initialData';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'manpower-quotas';

export function useEmployeeData() {
  const [quotas, setQuotas] = useState<Quota[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedQuotas = loadFromLocalStorage<Quota[]>(STORAGE_KEY, createInitialQuotas());
    setQuotas(savedQuotas);
  }, []);

  useEffect(() => {
    if (mounted && quotas.length > 0) {
      saveToLocalStorage(STORAGE_KEY, quotas);
    }
  }, [quotas, mounted]);

  const updateEmployee = (quotaId: string, employeeId: string, field: keyof Employee, value: any) => {
    setQuotas(prev => prev.map(quota => {
      if (quota.id === quotaId) {
        return {
          ...quota,
          employees: quota.employees.map(emp => 
            emp.id === employeeId ? { ...emp, [field]: value } : emp
          ),
        };
      }
      return quota;
    }));
  };

  const addEmployee = (quotaId: string) => {
    setQuotas(prev => prev.map(quota => {
      if (quota.id === quotaId) {
        const newSNo = quota.employees.length + 1;
        return {
          ...quota,
          employees: [...quota.employees, createEmptyEmployee(newSNo)],
        };
      }
      return quota;
    }));
    toast.success('Employee added successfully');
  };

  const deleteEmployee = (quotaId: string, employeeId: string) => {
    setQuotas(prev => prev.map(quota => {
      if (quota.id === quotaId) {
        const updatedEmployees = quota.employees
          .filter(emp => emp.id !== employeeId)
          .map((emp, index) => ({ ...emp, sNo: index + 1 }));
        return {
          ...quota,
          employees: updatedEmployees,
        };
      }
      return quota;
    }));
    toast.success('Employee deleted successfully');
  };

  const addQuota = () => {
    const newQuotaNumber = quotas.length + 1;
    const newQuota: Quota = {
      id: generateId(),
      name: `Quota ${newQuotaNumber}`,
      employees: Array.from({ length: 6 }, (_, i) => createEmptyEmployee(i + 1)),
    };
    setQuotas(prev => [...prev, newQuota]);
    toast.success(`${newQuota.name} added successfully`);
  };

  const deleteQuota = (quotaId: string) => {
    setQuotas(prev => prev.filter(quota => quota.id !== quotaId));
    toast.success('Quota deleted successfully');
  };

  return {
    quotas,
    setQuotas,
    updateEmployee,
    addEmployee,
    deleteEmployee,
    addQuota,
    deleteQuota,
    mounted,
  };
}

// Made with Bob
