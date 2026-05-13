'use client';

import { useState, useEffect } from 'react';
import { Quota, Employee } from '@/types/employee';
import { createEmptyEmployee, generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

export function useEmployeeData() {
  const [quotas, setQuotas] = useState<Quota[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  const fetchQuotas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/quotas');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setQuotas(data);
    } catch (err) {
      console.error('Error fetching quotas:', err);
      setError('Failed to load data. Please refresh the page.');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchQuotas();
  }, []);

  const updateEmployee = async (quotaId: string, employeeId: string, field: keyof Employee, value: any) => {
    // Optimistic update
    const previousQuotas = [...quotas];
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

    try {
      // Find the employee to get all its data
      const quota = quotas.find(q => q.id === quotaId);
      const employee = quota?.employees.find(e => e.id === employeeId);
      
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Update in database
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sNo: employee.sNo,
          name: employee.name,
          work: employee.work,
          comeBy: employee.comeBy,
          state: employee.state,
          salary: employee.salary,
          joinedDate: employee.joinedDate,
          visaExpiration: employee.visaExpiration,
          amountDue: employee.amountDue,
          [field]: value, // Apply the update
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
    } catch (err) {
      console.error('Error updating employee:', err);
      // Revert optimistic update
      setQuotas(previousQuotas);
      toast.error('Failed to update employee');
    }
  };

  const addEmployee = async (quotaId: string) => {
    const quota = quotas.find(q => q.id === quotaId);
    if (!quota) return;

    const newSNo = quota.employees.length + 1;
    const newEmployee = createEmptyEmployee(newSNo);

    // Optimistic update
    const previousQuotas = [...quotas];
    setQuotas(prev => prev.map(q => {
      if (q.id === quotaId) {
        return {
          ...q,
          employees: [...q.employees, newEmployee],
        };
      }
      return q;
    }));

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newEmployee.id,
          quotaId,
          sNo: newEmployee.sNo,
          name: newEmployee.name,
          work: newEmployee.work,
          comeBy: newEmployee.comeBy,
          state: newEmployee.state,
          salary: newEmployee.salary,
          joinedDate: newEmployee.joinedDate,
          visaExpiration: newEmployee.visaExpiration,
          amountDue: newEmployee.amountDue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      toast.success('Employee added successfully');
    } catch (err) {
      console.error('Error adding employee:', err);
      // Revert optimistic update
      setQuotas(previousQuotas);
      toast.error('Failed to add employee');
    }
  };

  const deleteEmployee = async (quotaId: string, employeeId: string) => {
    // Optimistic update
    const previousQuotas = [...quotas];
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

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      toast.success('Employee deleted successfully');
    } catch (err) {
      console.error('Error deleting employee:', err);
      // Revert optimistic update
      setQuotas(previousQuotas);
      toast.error('Failed to delete employee');
    }
  };

  const addQuota = async () => {
    const newQuotaNumber = quotas.length + 1;
    const newQuota: Quota = {
      id: generateId(),
      name: `Quota ${newQuotaNumber}`,
      employees: Array.from({ length: 6 }, (_, i) => createEmptyEmployee(i + 1)),
    };

    // Optimistic update
    const previousQuotas = [...quotas];
    setQuotas(prev => [...prev, newQuota]);

    try {
      // Create quota
      const quotaResponse = await fetch('/api/quotas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newQuota.id,
          name: newQuota.name,
        }),
      });

      if (!quotaResponse.ok) {
        throw new Error('Failed to create quota');
      }

      // Create employees for the quota
      for (const employee of newQuota.employees) {
        const empResponse = await fetch('/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: employee.id,
            quotaId: newQuota.id,
            sNo: employee.sNo,
            name: employee.name,
            work: employee.work,
            comeBy: employee.comeBy,
            state: employee.state,
            salary: employee.salary,
            joinedDate: employee.joinedDate,
            visaExpiration: employee.visaExpiration,
            amountDue: employee.amountDue,
          }),
        });

        if (!empResponse.ok) {
          throw new Error('Failed to create employee');
        }
      }

      toast.success(`${newQuota.name} added successfully`);
    } catch (err) {
      console.error('Error adding quota:', err);
      // Revert optimistic update
      setQuotas(previousQuotas);
      toast.error('Failed to add quota');
    }
  };

  const deleteQuota = async (quotaId: string) => {
    // Optimistic update
    const previousQuotas = [...quotas];
    setQuotas(prev => prev.filter(quota => quota.id !== quotaId));

    try {
      const response = await fetch(`/api/quotas/${quotaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete quota');
      }

      toast.success('Quota deleted successfully');
    } catch (err) {
      console.error('Error deleting quota:', err);
      // Revert optimistic update
      setQuotas(previousQuotas);
      toast.error('Failed to delete quota');
    }
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
    loading,
    error,
    refetch: fetchQuotas,
  };
}

// Made with Bob
