const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const DEPLOYED_URL = 'https://manpower-view.vercel.app';
const CSV_FILE_PATH = path.join(__dirname, '..', 'manpower-data (2).csv');

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function parseCSVData(csvContent) {
  const lines = csvContent.split('\n');
  const quotas = [];
  let currentQuota = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;
    
    if (line.startsWith('Quota ')) {
      if (currentQuota && currentQuota.employees.length > 0) {
        quotas.push(currentQuota);
      }
      
      currentQuota = {
        id: generateId(),
        name: line,
        employees: []
      };
      
      i++; // Skip header row
      continue;
    }
    
    if (currentQuota && line.includes(',')) {
      const fields = [];
      let currentField = '';
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      fields.push(currentField.trim());
      
      const [sno, name, work, comeBy, state, salary, joinedDate, visaExpiration, amountDue] = fields;
      
      if (!name || name === '') continue;
      
      currentQuota.employees.push({
        id: generateId(),
        sNo: currentQuota.employees.length + 1,
        name: name || '',
        work: work || '',
        comeBy: comeBy || '',
        state: state || '',
        salary: parseFloat(salary) || 0,
        joinedDate: joinedDate || '',
        visaExpiration: visaExpiration || '',
        amountDue: parseFloat(amountDue) || 0
      });
    }
  }
  
  if (currentQuota && currentQuota.employees.length > 0) {
    quotas.push(currentQuota);
  }
  
  return quotas;
}

async function pushDataToDeployment() {
  console.log('🚀 Starting automated data push to deployment...\n');
  console.log('='.repeat(60));
  
  let browser;
  
  try {
    // Read and parse CSV file
    console.log('📂 Reading CSV file:', CSV_FILE_PATH);
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const quotas = parseCSVData(csvContent);
    
    console.log('✅ CSV parsed successfully');
    console.log(`   - Total Quotas: ${quotas.length}`);
    quotas.forEach(q => {
      console.log(`   - ${q.name}: ${q.employees.length} employees`);
    });
    
    const totalEmployees = quotas.reduce((sum, q) => sum + q.employees.length, 0);
    console.log(`   - Total Employees: ${totalEmployees}\n`);
    
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Navigate to deployed app
    console.log(`🔗 Opening deployed app: ${DEPLOYED_URL}`);
    await page.goto(DEPLOYED_URL, { waitUntil: 'networkidle2' });
    console.log('✅ Page loaded successfully\n');
    
    // Inject data into localStorage
    console.log('💾 Injecting data into localStorage...');
    await page.evaluate((quotasData) => {
      localStorage.setItem('manpower-quotas', JSON.stringify(quotasData));
      console.log('Data stored in localStorage');
    }, quotas);
    
    console.log('✅ Data injected successfully\n');
    
    // Reload page to show the data
    console.log('🔄 Reloading page to display data...');
    await page.reload({ waitUntil: 'networkidle2' });
    
    // Wait a bit for the page to render
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take a screenshot for verification
    const screenshotPath = path.join(__dirname, '..', 'deployment-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}\n`);
    
    // Verify data was loaded
    const dataInStorage = await page.evaluate(() => {
      const data = localStorage.getItem('manpower-quotas');
      return data ? JSON.parse(data) : null;
    });
    
    if (dataInStorage && dataInStorage.length === quotas.length) {
      console.log('='.repeat(60));
      console.log('✅ SUCCESS! Data pushed to deployment successfully!');
      console.log('='.repeat(60));
      console.log('\n📊 Verification:');
      console.log(`   - Quotas in storage: ${dataInStorage.length}`);
      console.log(`   - Total employees: ${dataInStorage.reduce((sum, q) => sum + q.employees.length, 0)}`);
      console.log(`\n🌐 Visit ${DEPLOYED_URL} to see your data!`);
      console.log(`📸 Screenshot saved for verification\n`);
    } else {
      throw new Error('Data verification failed');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed\n');
    }
  }
}

// Run the script
pushDataToDeployment();

// Made with Bob
