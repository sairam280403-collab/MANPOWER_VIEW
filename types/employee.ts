export interface Employee {
  id: string;
  sNo: number;
  name: string;
  work: string;
  comeBy: string;
  state: string;
  salary: number;
  joinedDate: string;
  visaExpiration: string;
  amountDue: number;
}

export interface Quota {
  id: string;
  name: string;
  employees: Employee[];
}

export interface DashboardStats {
  totalEmployees: number;
  totalSalary: number;
  totalAmountDue: number;
  upcomingExpirations: number;
}

export type VisaStatus = 'expired' | 'expiring-soon' | 'valid';

export interface FilterOptions {
  state: string;
  work: string;
}

// Made with Bob
