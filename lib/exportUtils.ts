import * as XLSX from 'xlsx';
import { Quota, Employee } from '@/types/employee';
import { formatCurrency, formatDate } from './utils';

export function exportToExcel(quotas: Quota[], filename: string = 'manpower-data') {
  const workbook = XLSX.utils.book_new();

  quotas.forEach((quota) => {
    const data = quota.employees.map((emp) => ({
      'S.No': emp.sNo,
      'Name': emp.name,
      'Work': emp.work,
      'Come By': emp.comeBy,
      'State': emp.state,
      'Salary': emp.salary,
      'Joined Date': emp.joinedDate,
      'Visa Expiration': emp.visaExpiration,
      'Amount Due': emp.amountDue,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Set column widths
    const columnWidths = [
      { wch: 8 },  // S.No
      { wch: 20 }, // Name
      { wch: 15 }, // Work
      { wch: 15 }, // Come By
      { wch: 15 }, // State
      { wch: 12 }, // Salary
      { wch: 15 }, // Joined Date
      { wch: 18 }, // Visa Expiration
      { wch: 15 }, // Amount Due
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, quota.name);
  });

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportToCSV(quotas: Quota[], filename: string = 'manpower-data') {
  let csvContent = '';

  quotas.forEach((quota, index) => {
    if (index > 0) csvContent += '\n\n';
    
    csvContent += `${quota.name}\n`;
    csvContent += 'S.No,Name,Work,Come By,State,Salary,Joined Date,Visa Expiration,Amount Due\n';

    quota.employees.forEach((emp) => {
      const row = [
        emp.sNo,
        `"${emp.name}"`,
        `"${emp.work}"`,
        `"${emp.comeBy}"`,
        `"${emp.state}"`,
        emp.salary,
        emp.joinedDate,
        emp.visaExpiration,
        emp.amountDue,
      ].join(',');
      csvContent += row + '\n';
    });
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Made with Bob
