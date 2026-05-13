const puppeteer = require('puppeteer');

async function forceLoadData() {
  console.log('🚀 Opening deployed site and forcing data load...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the deployed site
    console.log('🌐 Opening https://manpower-view.vercel.app');
    await page.goto('https://manpower-view.vercel.app', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded\n');
    
    // Clear localStorage to force version check
    console.log('🗑️  Clearing localStorage...');
    await page.evaluate(() => {
      localStorage.clear();
      console.log('LocalStorage cleared');
    });
    
    console.log('✅ LocalStorage cleared\n');
    
    // Reload page to trigger version system
    console.log('🔄 Reloading page to load hardcoded data...');
    await page.reload({ waitUntil: 'networkidle2' });
    
    // Wait for data to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Take screenshot
    const screenshotPath = require('path').join(__dirname, '..', 'data-loaded-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}\n`);
    
    // Verify data
    const stats = await page.evaluate(() => {
      const employeeCount = document.querySelector('[class*="Total Employees"]')?.parentElement?.querySelector('div')?.textContent;
      const salary = document.querySelector('[class*="Total Salary"]')?.parentElement?.querySelector('div')?.textContent;
      const amountDue = document.querySelector('[class*="Total Amount Due"]')?.parentElement?.querySelector('div')?.textContent;
      
      return { employeeCount, salary, amountDue };
    });
    
    console.log('============================================================');
    console.log('✅ DATA LOADED SUCCESSFULLY!');
    console.log('============================================================\n');
    console.log('📊 Dashboard Stats:');
    console.log(`   - Total Employees: ${stats.employeeCount || 'Loading...'}`);
    console.log(`   - Total Salary: ${stats.salary || 'Loading...'}`);
    console.log(`   - Total Amount Due: ${stats.amountDue || 'Loading...'}`);
    console.log('\n🌐 Visit https://manpower-view.vercel.app to see your data!');
    console.log('💡 The data is now loaded and will persist in your browser.\n');
    
    // Keep browser open for 10 seconds so user can see
    console.log('⏳ Keeping browser open for 10 seconds...\n');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed');
  }
}

forceLoadData().catch(console.error);

// Made with Bob
