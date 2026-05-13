import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface EmployeeData {
  id: string;
  name: string;
  work: string;
  comeBy: string;
  state: string;
  salary: number;
  joinedDate: string;
  visaExpiration: string;
  amountDue: number;
}

interface QuotaData {
  id: string;
  name: string;
  employees: EmployeeData[];
}

function parseDate(dateValue: any): string {
  if (!dateValue) return '';
  
  // If it's already a string, return it
  if (typeof dateValue === 'string') return dateValue;
  
  // If it's an Excel date number
  if (typeof dateValue === 'number') {
    const date = XLSX.SSF.parse_date_code(dateValue);
    return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
  }
  
  return '';
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function importExcelData(filePath: string): QuotaData[] {
  console.log('📂 Reading Excel file:', filePath);
  
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);
  const quotas: QuotaData[] = [];
  
  // Process each sheet (each sheet is a quota)
  workbook.SheetNames.forEach((sheetName, index) => {
    console.log(`\n📋 Processing ${sheetName}...`);
    
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
    
    const employees: EmployeeData[] = [];
    
    jsonData.forEach((row, rowIndex) => {
      // Skip empty rows
      if (!row.Name || row.Name.trim() === '') {
        console.log(`  ⏭️  Row ${rowIndex + 1}: Empty, skipping`);
        return;
      }
      
      const employee: EmployeeData = {
        id: generateId(),
        name: row.Name?.toString().trim() || '',
        work: row.Work?.toString().trim() || '',
        comeBy: row['Come By']?.toString().trim() || '',
        state: row.State?.toString().trim() || '',
        salary: parseFloat(row.Salary) || 0,
        joinedDate: parseDate(row['Joined Date']),
        visaExpiration: parseDate(row['Visa Expiration']),
        amountDue: parseFloat(row['Amount Due']) || 0,
      };
      
      employees.push(employee);
      console.log(`  ✅ Row ${rowIndex + 1}: ${employee.name} - ${employee.work}`);
    });
    
    quotas.push({
      id: generateId(),
      name: sheetName,
      employees: employees,
    });
    
    console.log(`  📊 Total employees in ${sheetName}: ${employees.length}`);
  });
  
  return quotas;
}

function generateLocalStorageScript(quotas: QuotaData[]): string {
  const script = `
// Auto-generated data import script
// Run this in your browser console on https://manpower-view.vercel.app

(function() {
  console.log('🚀 Starting data import...');
  
  const quotasData = ${JSON.stringify(quotas, null, 2)};
  
  // Store in localStorage
  localStorage.setItem('manpower-quotas', JSON.stringify(quotasData));
  
  console.log('✅ Data imported successfully!');
  console.log('📊 Total quotas:', quotasData.length);
  
  quotasData.forEach((quota, index) => {
    console.log(\`  Quota \${index + 1} (\${quota.name}): \${quota.employees.length} employees\`);
  });
  
  console.log('\\n🔄 Reloading page to show imported data...');
  
  // Reload the page to show the imported data
  setTimeout(() => {
    window.location.reload();
  }, 1000);
})();
`;
  
  return script;
}

// Main execution
const excelFilePath = path.join(__dirname, '..', 'manpower-data (1).xlsx');
const outputScriptPath = path.join(__dirname, '..', 'import-data-to-browser.js');

console.log('🎯 Manpower Data Import Tool\n');
console.log('=' .repeat(50));

try {
  // Import data from Excel
  const quotas = importExcelData(excelFilePath);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Import Summary:');
  console.log('='.repeat(50));
  console.log(`Total Quotas: ${quotas.length}`);
  
  let totalEmployees = 0;
  quotas.forEach((quota, index) => {
    totalEmployees += quota.employees.length;
    console.log(`  ${quota.name}: ${quota.employees.length} employees`);
  });
  
  console.log(`Total Employees: ${totalEmployees}`);
  
  // Generate browser script
  const browserScript = generateLocalStorageScript(quotas);
  fs.writeFileSync(outputScriptPath, browserScript);
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ SUCCESS!');
  console.log('='.repeat(50));
  console.log(`\n📄 Browser import script created: ${outputScriptPath}`);
  console.log('\n📋 Next Steps:');
  console.log('1. Open your deployed app: https://manpower-view.vercel.app');
  console.log('2. Open browser DevTools (F12 or Cmd+Option+I)');
  console.log('3. Go to Console tab');
  console.log('4. Copy and paste the contents of import-data-to-browser.js');
  console.log('5. Press Enter');
  console.log('6. The page will reload with your data!\n');
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

// Made with Bob
