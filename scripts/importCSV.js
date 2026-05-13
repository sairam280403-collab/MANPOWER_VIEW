const fs = require('fs');
const path = require('path');

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function parseCSVData(csvContent) {
  const lines = csvContent.split('\n');
  const quotas = [];
  let currentQuota = null;
  let currentQuotaName = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if this is a quota header (e.g., "Quota 1", "Quota 2")
    if (line.startsWith('Quota ')) {
      // Save previous quota if exists
      if (currentQuota) {
        quotas.push(currentQuota);
      }
      
      // Start new quota
      currentQuotaName = line;
      currentQuota = {
        id: generateId(),
        name: currentQuotaName,
        employees: []
      };
      
      // Skip the next line (header row)
      i++;
      continue;
    }
    
    // Parse employee data
    if (currentQuota && line.includes(',')) {
      // Parse CSV line (handle quoted fields)
      const fields = [];
      let currentField = '';
      let inQuotes = false;
      
      for (let char of line) {
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
      
      // Extract employee data
      const [sno, name, work, comeBy, state, salary, joinedDate, visaExpiration, amountDue] = fields;
      
      // Skip if name is empty
      if (!name || name === '') continue;
      
      const employee = {
        id: generateId(),
        name: name || '',
        work: work || '',
        comeBy: comeBy || '',
        state: state || '',
        salary: parseFloat(salary) || 0,
        joinedDate: joinedDate || '',
        visaExpiration: visaExpiration || '',
        amountDue: parseFloat(amountDue) || 0
      };
      
      currentQuota.employees.push(employee);
      console.log(`  ✅ ${currentQuotaName} - Row ${sno}: ${employee.name} - ${employee.work || 'No work specified'}`);
    }
  }
  
  // Add the last quota
  if (currentQuota) {
    quotas.push(currentQuota);
  }
  
  return quotas;
}

function generateLocalStorageScript(quotas) {
  const script = `
// Auto-generated data import script for CSV data
// Run this in your browser console on https://manpower-view.vercel.app

(function() {
  console.log('🚀 Starting CSV data import...');
  
  const quotasData = ${JSON.stringify(quotas, null, 2)};
  
  // Store in localStorage
  localStorage.setItem('manpower-quotas', JSON.stringify(quotasData));
  
  console.log('✅ Data imported successfully!');
  console.log('📊 Total quotas:', quotasData.length);
  
  quotasData.forEach((quota, index) => {
    console.log(\`  \${quota.name}: \${quota.employees.length} employees\`);
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
const csvFilePath = path.join(__dirname, '..', 'manpower-data (2).csv');
const outputScriptPath = path.join(__dirname, '..', 'import-data-to-browser.js');

console.log('🎯 Manpower CSV Data Import Tool\n');
console.log('='.repeat(60));

try {
  // Read CSV file
  console.log('📂 Reading CSV file:', csvFilePath);
  const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
  
  // Parse CSV data
  console.log('\n📋 Parsing CSV data...\n');
  const quotas = parseCSVData(csvContent);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Import Summary:');
  console.log('='.repeat(60));
  console.log(`Total Quotas: ${quotas.length}`);
  
  let totalEmployees = 0;
  quotas.forEach((quota) => {
    totalEmployees += quota.employees.length;
    console.log(`  ${quota.name}: ${quota.employees.length} employees`);
  });
  
  console.log(`Total Employees: ${totalEmployees}`);
  
  // Generate browser script
  const browserScript = generateLocalStorageScript(quotas);
  fs.writeFileSync(outputScriptPath, browserScript);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ SUCCESS!');
  console.log('='.repeat(60));
  console.log(`\n📄 Browser import script created: ${outputScriptPath}`);
  console.log('\n📋 How to Import Data to Your Deployed App:');
  console.log('='.repeat(60));
  console.log('\n1. Open your deployed app:');
  console.log('   🌐 https://manpower-view.vercel.app\n');
  console.log('2. Open browser DevTools:');
  console.log('   • Chrome/Edge: Press F12 or Cmd+Option+I (Mac)');
  console.log('   • Firefox: Press F12 or Cmd+Option+K (Mac)');
  console.log('   • Safari: Enable Developer menu, then Cmd+Option+C\n');
  console.log('3. Go to the "Console" tab\n');
  console.log('4. Open the file: import-data-to-browser.js');
  console.log('   (Located in your project root)\n');
  console.log('5. Copy ALL the content from that file\n');
  console.log('6. Paste it into the browser console\n');
  console.log('7. Press Enter\n');
  console.log('8. ✨ The page will reload with your data!\n');
  console.log('='.repeat(60));
  
  // Also create a simple HTML file for easy copy-paste
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Import Data to Manpower View</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 10px;
        }
        .step {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 4px solid #4CAF50;
        }
        .code-box {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 20px 0;
            position: relative;
        }
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        .copy-btn:hover {
            background: #45a049;
        }
        .success {
            color: #4CAF50;
            font-weight: bold;
        }
        .link {
            color: #2196F3;
            text-decoration: none;
            font-weight: bold;
        }
        .link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Import Data to Manpower View</h1>
        
        <div class="step">
            <h3>Step 1: Open Your Deployed App</h3>
            <p>Click this link: <a href="https://manpower-view.vercel.app" target="_blank" class="link">https://manpower-view.vercel.app</a></p>
        </div>
        
        <div class="step">
            <h3>Step 2: Open Browser Console</h3>
            <ul>
                <li><strong>Chrome/Edge:</strong> Press <code>F12</code> or <code>Cmd+Option+I</code> (Mac)</li>
                <li><strong>Firefox:</strong> Press <code>F12</code> or <code>Cmd+Option+K</code> (Mac)</li>
                <li><strong>Safari:</strong> Enable Developer menu, then <code>Cmd+Option+C</code></li>
            </ul>
        </div>
        
        <div class="step">
            <h3>Step 3: Copy and Paste This Script</h3>
            <p>Click the "Copy" button below, then paste into the browser console and press Enter:</p>
            <div class="code-box">
                <button class="copy-btn" onclick="copyCode()">Copy Script</button>
                <pre id="script-code">${browserScript.replace(/</g, '<').replace(/>/g, '>')}</pre>
            </div>
        </div>
        
        <div class="step">
            <h3>Step 4: Done! ✨</h3>
            <p class="success">The page will automatically reload with your data imported!</p>
            <p><strong>Summary:</strong></p>
            <ul>
                <li>Total Quotas: ${quotas.length}</li>
                ${quotas.map(q => `<li>${q.name}: ${q.employees.length} employees</li>`).join('\n                ')}
                <li><strong>Total Employees: ${totalEmployees}</strong></li>
            </ul>
        </div>
    </div>
    
    <script>
        function copyCode() {
            const code = document.getElementById('script-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const btn = document.querySelector('.copy-btn');
                btn.textContent = '✓ Copied!';
                btn.style.background = '#4CAF50';
                setTimeout(() => {
                    btn.textContent = 'Copy Script';
                    btn.style.background = '#4CAF50';
                }, 2000);
            });
        }
    </script>
</body>
</html>`;
  
  const htmlPath = path.join(__dirname, '..', 'IMPORT_INSTRUCTIONS.html');
  fs.writeFileSync(htmlPath, htmlContent);
  
  console.log(`\n📄 HTML instructions created: ${htmlPath}`);
  console.log('   Open this file in your browser for easy copy-paste!\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}

// Made with Bob
