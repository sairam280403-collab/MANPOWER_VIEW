# 🚀 Quick Start Guide - Database Setup

This guide will help you set up the Neon PostgreSQL database so all users can see the same data across all devices.

## 📋 Prerequisites

- A Neon account (free tier available)
- Your application code (already set up)

## 🎯 Step-by-Step Setup

### 1. Create Neon Database Account

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up for a free account (or sign in if you have one)
3. Click **"Create a project"**
4. Give your project a name (e.g., "Manpower Management")
5. Select a region closest to your users
6. Click **"Create project"**

### 2. Get Your Database Connection String

1. After creating the project, you'll see a **Connection Details** section
2. Copy the **Connection string** - it looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
3. **IMPORTANT**: Save this connection string - you'll need it for both local development and Vercel deployment

### 3. Set Up Local Development

1. In your project folder (`manpower-view`), create a file named `.env.local`:
   ```bash
   touch .env.local
   ```

2. Open `.env.local` and add your connection string:
   ```
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

3. **IMPORTANT**: Never commit `.env.local` to Git (it's already in `.gitignore`)

### 4. Initialize the Database

Run these commands in your terminal from the `manpower-view` folder:

```bash
# Install dependencies (if not already done)
npm install

# Create database tables
npm run db:init

# Populate with your CSV data (20 employees across 3 quotas)
npm run db:seed
```

You should see success messages like:
```
✅ Database tables created successfully!
✅ Database seeded with 3 quotas and 20 employees!
```

### 5. Test Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see:
- All 20 employees from your CSV file
- Data loading from the database (not localStorage)
- All CRUD operations working (add, edit, delete)

### 6. Deploy to Vercel with Database

1. **Add DATABASE_URL to Vercel:**
   - Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project (`manpower-view`)
   - Go to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name**: `DATABASE_URL`
     - **Value**: Your Neon connection string (same as in `.env.local`)
     - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

2. **Redeploy your application:**
   ```bash
   # Commit and push your changes
   git add .
   git commit -m "Add database integration with Neon PostgreSQL"
   git push origin main
   ```

3. Vercel will automatically redeploy with the database connection

### 7. Verify Deployment

1. Open your Vercel URL: `https://manpower-view.vercel.app`
2. You should see all 20 employees from the database
3. **Test from multiple devices:**
   - Open the URL on your phone
   - Open it on another computer
   - Make a change on one device (e.g., edit an employee name)
   - Refresh on the other device - you should see the change!

## ✅ Success Checklist

- [ ] Neon account created
- [ ] Database connection string obtained
- [ ] `.env.local` file created with DATABASE_URL
- [ ] Database initialized (`npm run db:init`)
- [ ] Database seeded with data (`npm run db:seed`)
- [ ] Local testing successful
- [ ] DATABASE_URL added to Vercel environment variables
- [ ] Code pushed to GitHub
- [ ] Vercel redeployed automatically
- [ ] Changes visible across all devices

## 🎉 What Changed?

### Before (localStorage):
- ❌ Data only visible on the device where it was entered
- ❌ Each user had their own separate data
- ❌ No data synchronization between devices

### After (Neon Database):
- ✅ All users see the same data
- ✅ Changes sync in real-time across all devices
- ✅ Data persists permanently in the cloud
- ✅ Professional, production-ready solution

## 🔧 Troubleshooting

### Error: "DATABASE_URL environment variable is not set"
- **Local**: Make sure `.env.local` exists and contains DATABASE_URL
- **Vercel**: Add DATABASE_URL to Vercel environment variables and redeploy

### Error: "Failed to fetch data"
- Check your internet connection
- Verify the DATABASE_URL is correct
- Make sure you ran `npm run db:init` to create tables

### Data not showing up
- Run `npm run db:seed` to populate the database
- Check the browser console for errors
- Verify the API routes are working: visit `/api/quotas` in your browser

### Changes not syncing between devices
- Make sure both devices are using the deployed Vercel URL (not localhost)
- Check that DATABASE_URL is set in Vercel environment variables
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs/introduction)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Detailed technical documentation

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Check the Vercel deployment logs
3. Verify all environment variables are set correctly
4. Make sure you ran both `db:init` and `db:seed` commands

---

**Made with Bob** 🤖