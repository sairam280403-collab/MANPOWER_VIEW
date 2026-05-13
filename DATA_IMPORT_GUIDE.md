# Data Import Guide

## How to Import Your CSV Data

Your application already has a built-in CSV import feature. Here's how to use it:

### Method 1: Using the Web Interface (Recommended)

1. **Open the deployed application**: https://manpower-view.vercel.app

2. **Locate the Import Button**: 
   - Look for the "Import CSV" button in the top section of the page
   - It should be near the Export buttons

3. **Import Your Data**:
   - Click the "Import CSV" button
   - Either drag and drop your `manpower-data (2).csv` file
   - Or click to browse and select the file
   - The data will be automatically imported and saved to your browser's localStorage

4. **Verify**: 
   - The dashboard should immediately show all 20 employees across 3 quotas
   - Summary cards will update with totals

### Method 2: Using the Script (For Automation)

The script `pushDataToDeployment.js` was created to automate data injection, but it has a limitation:
- It injects data into a headless browser session
- This data won't persist to your regular browser
- It's useful for testing or automated deployments

To use it:
```bash
npm run push-data
```

### Important Notes

- **localStorage is browser-specific**: Data saved in one browser won't appear in another
- **localStorage is domain-specific**: Data is tied to https://manpower-view.vercel.app
- **Data persists**: Once imported, your data will remain in your browser until you clear it
- **No backend**: This app uses only frontend storage (localStorage)

### CSV File Format

Your CSV file should follow this structure:

```
Quota 1
S.No,Name,Work,Come By,State,Salary,Joined Date,Visa Expiration,Amount Due
1,"Employee Name","Job Title","Referrer","State",6.5,2026-02-06,,2180
...

Quota 2
S.No,Name,Work,Come By,State,Salary,Joined Date,Visa Expiration,Amount Due
...
```

### Troubleshooting

**Q: I imported data but don't see it**
- Make sure you're using the same browser where you imported
- Try refreshing the page (Ctrl+R or Cmd+R)
- Check browser console for errors (F12)

**Q: Can I share this data with others?**
- No, localStorage is local to each browser
- Each user needs to import the CSV file themselves
- Or you could build a backend to share data (future enhancement)

**Q: How do I update the data?**
- Simply import a new CSV file
- It will replace the existing data
- Or edit directly in the table (changes auto-save)

### Next Steps

For a permanent data solution, consider:
1. Adding a backend database (e.g., Supabase, Firebase)
2. Implementing user authentication
3. Cloud storage for CSV files
4. Real-time data synchronization

---

**Current Status**: ✅ Application deployed and ready for data import via web interface