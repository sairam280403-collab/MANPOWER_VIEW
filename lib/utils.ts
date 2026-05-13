import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Employee, Quota, DashboardStats, VisaStatus } from "@/types/employee";
import { differenceInDays, parseISO, isValid } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVisaStatus(visaExpiration: string): VisaStatus {
  if (!visaExpiration) return 'valid';
  
  try {
    const expirationDate = parseISO(visaExpiration);
    if (!isValid(expirationDate)) return 'valid';
    
    const today = new Date();
    const daysUntilExpiration = differenceInDays(expirationDate, today);
    
    if (daysUntilExpiration < 0) return 'expired';
    if (daysUntilExpiration <= 30) return 'expiring-soon';
    return 'valid';
  } catch {
    return 'valid';
  }
}

export function getVisaStatusColor(status: VisaStatus): string {
  switch (status) {
    case 'expired':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30';
    case 'expiring-soon':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30';
    case 'valid':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30';
  }
}

export function calculateQuotaTotal(employees: Employee[]): number {
  return employees.reduce((sum, emp) => sum + (emp.amountDue || 0), 0);
}

export function calculateDashboardStats(quotas: Quota[]): DashboardStats {
  let totalEmployees = 0;
  let totalSalary = 0;
  let totalAmountDue = 0;
  let upcomingExpirations = 0;

  quotas.forEach(quota => {
    quota.employees.forEach(emp => {
      totalEmployees++;
      totalSalary += emp.salary || 0;
      totalAmountDue += emp.amountDue || 0;
      
      const status = getVisaStatus(emp.visaExpiration);
      if (status === 'expiring-soon' || status === 'expired') {
        upcomingExpirations++;
      }
    });
  });

  return {
    totalEmployees,
    totalSalary,
    totalAmountDue,
    upcomingExpirations,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createEmptyEmployee(sNo: number): Employee {
  return {
    id: generateId(),
    sNo,
    name: '',
    work: '',
    comeBy: '',
    state: '',
    salary: 0,
    joinedDate: '',
    visaExpiration: '',
    amountDue: 0,
  };
}

export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

// Made with Bob
