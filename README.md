# Manpower Management System

A modern, responsive Single Page Application (SPA) for managing company employee/account details. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

### 📊 Dashboard Overview
- **Real-time Statistics**: Total employees, salary, amount due, and visa expiration alerts
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Dark Mode**: Toggle between light and dark themes with persistent preference

### 📋 Data Management
- **Quota System**: Organize employees into separate quota groups (Quota 1, 2, 3, etc.)
- **Inline Editing**: Click any cell to edit directly in the table
- **Auto-save**: All changes automatically saved to browser's Local Storage
- **Add/Delete**: Dynamically add or remove employees and quotas

### 🔍 Search & Filter
- **Smart Search**: Search by employee name, state, or work type
- **Advanced Filters**: Filter by state and work type
- **Real-time Results**: Instant filtering as you type

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices with card-based layout
- **Tablet & Desktop**: Responsive table view with horizontal scrolling
- **Adaptive UI**: Automatically switches between card and table views

### 🎨 Visual Features
- **Visa Status Colors**:
  - 🔴 Red: Expired visas
  - 🟡 Yellow: Expiring within 30 days
  - 🟢 Green: Valid visas
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: Real-time feedback for all actions
- **Collapsible Sections**: Expand/collapse quota sections

### 📤 Export Options
- **Excel Export**: Export all data to .xlsx format
- **CSV Export**: Export all data to .csv format
- **Formatted Data**: Includes all employee information organized by quota

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Excel Export**: XLSX library
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd manpower-view
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## Usage Guide

### Adding Employees

1. Click the **"Add"** button in any quota section
2. Click on empty cells to enter employee information
3. Data is automatically saved to Local Storage

### Editing Data

1. Click any cell in the table (or card on mobile)
2. Enter new value
3. Press Enter to save or Escape to cancel
4. Changes are automatically persisted

### Managing Quotas

- **Add Quota**: Click "Add Quota" button in the toolbar
- **Delete Quota**: Click the trash icon in the quota header
- **Collapse/Expand**: Click the chevron icon to toggle visibility

### Searching & Filtering

1. Use the search bar to find employees by name, state, or work
2. Use dropdown filters to narrow results by state or work type
3. Click "Clear" to reset all filters

### Exporting Data

1. Click "Excel" or "CSV" button in the toolbar
2. File will download automatically with all quota data
3. Each quota appears as a separate sheet in Excel

### Dark Mode

- Click the sun/moon icon in the header to toggle
- Preference is saved and persists across sessions

## Data Structure

Each employee record contains:
- **S.No**: Serial number
- **Name**: Employee name
- **Work**: Job type/role
- **Come By**: Referral/source
- **State**: Location/state
- **Salary**: Monthly salary (₹)
- **Joined Date**: Date of joining
- **Visa Expiration**: Visa expiry date
- **Amount Due**: Outstanding amount (₹)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Storage

All data is stored in your browser's Local Storage under the key `manpower-quotas`. To reset:

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear Local Storage for this site

## Performance

- Optimized for 1000+ employee records
- Lazy loading and virtualization ready
- Minimal bundle size with code splitting
- Fast initial load with Next.js optimization

## Customization

### Adding New Fields

1. Update `types/employee.ts` interface
2. Add column in `QuotaSection.tsx` table header
3. Add cell in `EmployeeRow.tsx`
4. Add field in `EmployeeCard.tsx` for mobile view

### Changing Colors

Edit Tailwind classes in components or update `globals.css` for theme colors.

### Modifying Initial Quotas

Edit `createInitialQuotas()` function in `hooks/useEmployeeData.ts`.

## Troubleshooting

### Data Not Saving
- Check browser Local Storage is enabled
- Clear cache and reload
- Check browser console for errors

### Export Not Working
- Ensure pop-ups are not blocked
- Check browser download settings
- Try different export format

### Dark Mode Not Working
- Clear Local Storage
- Check browser supports dark mode
- Reload the page

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
