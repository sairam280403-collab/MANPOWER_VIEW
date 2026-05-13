# Feature Documentation

Complete guide to all features in the Manpower Management System.

## Table of Contents
1. [Dashboard Overview](#dashboard-overview)
2. [Employee Management](#employee-management)
3. [Quota System](#quota-system)
4. [Search & Filter](#search--filter)
5. [Data Export](#data-export)
6. [Visual Indicators](#visual-indicators)
7. [Responsive Design](#responsive-design)
8. [Dark Mode](#dark-mode)
9. [Data Persistence](#data-persistence)

---

## Dashboard Overview

### Summary Statistics Cards

Four key metrics displayed at the top:

1. **Total Employees**
   - Shows total count across all quotas
   - Blue themed card with Users icon
   - Updates in real-time

2. **Total Salary**
   - Sum of all employee salaries
   - Displayed in Lakhs (₹)
   - Green themed card with Dollar icon

3. **Total Amount Due**
   - Sum of all outstanding amounts
   - Displayed in Lakhs (₹)
   - Yellow themed card with Trending Up icon

4. **Visa Alerts**
   - Count of expired or expiring visas
   - Red themed card with Alert icon
   - Includes visas expiring within 30 days

### Features:
- Animated entrance with staggered delays
- Glassmorphism design
- Hover effects with shadow transitions
- Responsive grid layout (1-4 columns)

---

## Employee Management

### Adding Employees

**Desktop/Tablet:**
1. Navigate to desired quota section
2. Click "Add" button in quota header
3. New empty row appears at bottom
4. Click cells to enter data

**Mobile:**
1. Navigate to desired quota section
2. Click "Add" button
3. New card appears
4. Tap fields to edit

### Editing Employee Data

**Inline Editing (Desktop/Tablet):**
- Click any cell to edit
- Input field appears with current value
- Press Enter to save
- Press Escape to cancel
- Green checkmark to confirm
- Red X to cancel

**Quick Edit (Mobile):**
- Tap any field in the card
- Browser prompt appears
- Enter new value
- Automatically saved

### Deleting Employees

- Click trash icon in row/card
- Employee removed immediately
- Serial numbers auto-adjust
- Toast notification confirms deletion
- Data saved to Local Storage

### Editable Fields

All fields are editable:
- **S.No**: Serial number (auto-managed)
- **Name**: Employee full name
- **Work**: Job type/role
- **Come By**: Referral source
- **State**: Location/state
- **Salary**: Monthly salary (₹)
- **Joined Date**: Date format (YYYY-MM-DD)
- **Visa Expiration**: Date format (YYYY-MM-DD)
- **Amount Due**: Outstanding amount (₹)

---

## Quota System

### What are Quotas?

Quotas are organizational groups for employees. Think of them as:
- Departments
- Teams
- Projects
- Locations
- Any logical grouping

### Default Quotas

Initial setup includes:
- **Quota 1**: 6 empty employee slots
- **Quota 2**: 6 empty employee slots
- **Quota 3**: 9 empty employee slots

### Managing Quotas

**Add New Quota:**
1. Click "Add Quota" button in toolbar
2. New quota created with 6 empty slots
3. Named sequentially (Quota 4, 5, etc.)

**Delete Quota:**
1. Click trash icon in quota header
2. Entire quota and all employees removed
3. Confirmation toast appears

**Collapse/Expand:**
1. Click chevron icon in quota header
2. Smooth animation toggles visibility
3. State persists during session

### Quota Features

Each quota section shows:
- Quota name and employee count
- Total amount due for that quota
- Add employee button
- Delete quota button
- Collapse/expand toggle

---

## Search & Filter

### Search Functionality

**Search Bar:**
- Located in toolbar
- Real-time search as you type
- Searches across:
  - Employee names
  - States
  - Work types
- Case-insensitive
- Clear button (X) to reset

**Search Behavior:**
- Shows only matching employees
- Hides quotas with no matches
- Maintains quota structure
- Instant results

### Filter Options

**State Filter:**
- Dropdown with all unique states
- "All States" option to clear
- Only shows employees from selected state

**Work Type Filter:**
- Dropdown with all unique work types
- "All Work Types" option to clear
- Only shows employees with selected work type

**Combined Filters:**
- Search + State + Work Type work together
- AND logic (all conditions must match)
- Clear button removes all filters

### Filter Features

- Dynamic options (updates as data changes)
- Sorted alphabetically
- Shows active filter count
- One-click clear all filters

---

## Data Export

### Excel Export

**Features:**
- Exports all quotas to single .xlsx file
- Each quota as separate sheet
- Formatted columns with proper widths
- Includes all employee data
- Preserves data types (numbers, dates)

**Usage:**
1. Click "Excel" button in toolbar
2. File downloads automatically
3. Named: `manpower-data.xlsx`

**Excel Structure:**
```
Sheet 1: Quota 1
Sheet 2: Quota 2
Sheet 3: Quota 3
...
```

### CSV Export

**Features:**
- Exports all quotas to single .csv file
- Quota sections separated by blank lines
- Header row for each quota
- Compatible with Excel, Google Sheets

**Usage:**
1. Click "CSV" button in toolbar
2. File downloads automatically
3. Named: `manpower-data.csv`

**CSV Structure:**
```
Quota 1
S.No,Name,Work,...
1,John Doe,Engineer,...

Quota 2
S.No,Name,Work,...
1,Jane Smith,Manager,...
```

---

## Visual Indicators

### Visa Expiration Colors

Automatic color coding based on expiration date:

**🔴 Red (Expired):**
- Visa expiration date has passed
- Immediate attention required
- Dark red background
- High contrast text

**🟡 Yellow (Expiring Soon):**
- Visa expires within 30 days
- Warning state
- Yellow background
- Action needed soon

**🟢 Green (Valid):**
- Visa valid for 30+ days
- Normal state
- Green background
- No immediate action needed

### Color Application

Colors appear in:
- Desktop table cells
- Mobile card visa field
- Consistent across themes
- Accessible contrast ratios

### Other Visual Cues

**Hover States:**
- Editable cells highlight on hover
- Buttons scale slightly
- Cards lift with shadow

**Loading States:**
- Spinner during initial load
- Skeleton animations (if implemented)

**Empty States:**
- "Click to edit" placeholder text
- Gray color for empty fields
- Helpful prompts

---

## Responsive Design

### Mobile View (< 768px)

**Layout:**
- Card-based employee display
- Stacked vertically
- Full-width cards
- Touch-optimized buttons

**Features:**
- Swipe-friendly spacing
- Large tap targets
- Simplified navigation
- Optimized for portrait

**Card Layout:**
```
┌─────────────────────┐
│ #1  John Doe    [×] │
│                     │
│ 💼 Engineer         │
│ 📍 California       │
│ 👤 Referral         │
│ 💰 ₹50,000         │
│                     │
│ Joined: Jan 2024    │
│ Visa: Dec 2025      │
│ Due: ₹10,000       │
└─────────────────────┘
```

### Tablet View (768px - 1024px)

**Layout:**
- Table view with horizontal scroll
- Sticky headers
- Compact spacing
- Touch-friendly

**Features:**
- Optimized column widths
- Smooth scrolling
- Readable text sizes
- Landscape optimized

### Desktop View (> 1024px)

**Layout:**
- Full table view
- All columns visible
- Maximum information density
- Mouse-optimized interactions

**Features:**
- Hover states
- Inline editing
- Keyboard shortcuts
- Multi-column sorting ready

### Breakpoint Summary

```
Mobile:    < 768px   (Card view)
Tablet:    768-1024px (Table with scroll)
Desktop:   > 1024px   (Full table)
```

---

## Dark Mode

### Features

**Toggle:**
- Sun/Moon icon in header
- Instant theme switch
- Smooth transitions
- Persistent preference

**Theme Storage:**
- Saved to Local Storage
- Persists across sessions
- Respects system preference initially

**Color Scheme:**

**Light Mode:**
- White backgrounds
- Gray text
- Blue accents
- Soft shadows

**Dark Mode:**
- Dark gray backgrounds
- Light gray text
- Blue accents (adjusted)
- Subtle shadows

### Implementation

- CSS variables for colors
- Tailwind dark: classes
- Smooth 150ms transitions
- Accessible contrast ratios

### Supported Elements

All UI elements support dark mode:
- Cards and containers
- Tables and cells
- Buttons and inputs
- Icons and text
- Borders and shadows
- Scrollbars

---

## Data Persistence

### Local Storage

**What's Saved:**
- All employee data
- All quota structures
- Employee assignments
- Serial numbers

**Storage Key:**
```
manpower-quotas
```

**When Data Saves:**
- After every edit
- When adding employees
- When deleting employees
- When adding/deleting quotas
- Automatic (no manual save needed)

### Data Structure

```json
[
  {
    "id": "unique-id-1",
    "name": "Quota 1",
    "employees": [
      {
        "id": "emp-id-1",
        "sNo": 1,
        "name": "John Doe",
        "work": "Engineer",
        ...
      }
    ]
  }
]
```

### Data Management

**Backup:**
- Use Export feature regularly
- Download Excel/CSV copies
- Store in cloud/external drive

**Reset:**
- Clear browser Local Storage
- Refresh page
- Default quotas recreated

**Migration:**
- Export from old browser
- Import data manually in new browser
- Or use same browser profile

### Limitations

- Browser-specific storage
- ~5-10MB limit (plenty for this app)
- Cleared if browser data cleared
- Not synced across devices

### Best Practices

1. Regular exports for backup
2. Don't clear browser data
3. Use same browser/profile
4. Export before major changes
5. Keep backup copies

---

## Keyboard Shortcuts

### Editing
- **Enter**: Save current edit
- **Escape**: Cancel current edit
- **Tab**: Move to next field (browser default)

### Navigation
- **Arrow Keys**: Navigate table (browser default)
- **Page Up/Down**: Scroll page

---

## Performance

### Optimizations

- Lazy loading components
- Memoized calculations
- Efficient re-renders
- Optimized bundle size

### Capacity

- Handles 1000+ employees smoothly
- Fast search and filter
- Instant data updates
- Smooth animations

---

## Browser Compatibility

### Fully Supported
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Browsers
- ✅ iOS Safari 14+
- ✅ Chrome Mobile
- ✅ Samsung Internet

### Required Features
- Local Storage
- ES6+ JavaScript
- CSS Grid & Flexbox
- Modern CSS features

---

## Accessibility

### Features
- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast ratios
- Focus indicators
- Screen reader friendly

### WCAG Compliance
- Level AA compliant
- Color contrast ratios met
- Text alternatives provided
- Keyboard accessible

---

## Future Enhancements

Potential features for future versions:
- Backend database integration
- User authentication
- Multi-user collaboration
- Advanced reporting
- Data visualization charts
- Email notifications
- PDF export
- Print layouts
- Bulk import/export
- Advanced filtering
- Custom fields
- Role-based access

---

For questions or feature requests, please refer to the main README.md file.