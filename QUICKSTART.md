# Quick Start Guide

Get up and running with the Manpower Management System in 5 minutes!

## Prerequisites

- Node.js 18 or higher installed
- npm or yarn package manager

## Installation

1. **Navigate to the project directory:**
```bash
cd manpower-view
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
```
http://localhost:3000
```

That's it! The application is now running.

## First Steps

### 1. Explore the Dashboard

You'll see:
- 4 summary cards showing statistics
- 3 default quotas (Quota 1, 2, 3)
- Empty employee slots ready for data

### 2. Add Your First Employee

**On Desktop/Tablet:**
1. Click the "Add" button in any quota section
2. Click on the empty cells to enter data
3. Press Enter to save each field

**On Mobile:**
1. Tap the "Add" button
2. Tap any field in the card
3. Enter data in the prompt
4. Data saves automatically

### 3. Try the Features

**Search:**
- Type in the search bar to find employees

**Filter:**
- Use the dropdown filters to narrow results

**Dark Mode:**
- Click the sun/moon icon in the header

**Export:**
- Click "Excel" or "CSV" to download data

## Sample Data Entry

Here's example data to get started:

**Employee 1:**
- Name: John Doe
- Work: Software Engineer
- Come By: LinkedIn
- State: California
- Salary: 75000
- Joined Date: 2024-01-15
- Visa Expiration: 2026-12-31
- Amount Due: 5000

**Employee 2:**
- Name: Jane Smith
- Work: Project Manager
- Come By: Referral
- State: New York
- Salary: 85000
- Joined Date: 2023-06-01
- Visa Expiration: 2025-05-30
- Amount Due: 3000

## Common Tasks

### Adding a New Quota
1. Click "Add Quota" button in the toolbar
2. New quota appears with empty slots

### Deleting an Employee
1. Click the trash icon in the row/card
2. Employee is removed immediately

### Exporting Data
1. Click "Excel" or "CSV" button
2. File downloads automatically

### Changing Theme
1. Click sun/moon icon
2. Theme switches instantly
3. Preference is saved

## Keyboard Shortcuts

- **Enter**: Save current edit
- **Escape**: Cancel current edit
- **Tab**: Move to next field

## Tips

1. **Data is Auto-Saved**: Every change saves automatically to your browser
2. **Mobile Friendly**: Works great on phones and tablets
3. **No Login Required**: Start using immediately
4. **Export Regularly**: Download backups of your data
5. **Dark Mode**: Better for low-light environments

## Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Data Not Saving
- Check if Local Storage is enabled in browser
- Try a different browser
- Clear browser cache and reload

## Next Steps

1. **Read the Full Documentation**: Check [README.md](README.md)
2. **Explore Features**: See [FEATURES.md](FEATURES.md)
3. **Deploy Your App**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

## Need Help?

- Check the documentation files
- Review the [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Look at component code for examples

## Production Build

When ready to deploy:

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel
vercel
```

---

**You're all set!** Start managing your employee data. 🚀

For detailed information, see the complete [README.md](README.md) file.