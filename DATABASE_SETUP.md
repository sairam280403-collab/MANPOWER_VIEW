# Database Setup Guide - Neon PostgreSQL

This guide will help you set up a Neon PostgreSQL database for your Manpower View application.

## Step 1: Create a Neon Account

1. Go to https://neon.tech
2. Click "Sign Up" (it's FREE)
3. Sign up with GitHub, Google, or Email
4. Verify your email if needed

## Step 2: Create a New Project

1. Once logged in, click "Create Project"
2. Project Name: `manpower-view`
3. Region: Choose closest to your users (e.g., AWS US East for USA)
4. PostgreSQL Version: Keep default (latest)
5. Click "Create Project"

## Step 3: Get Your Database Connection String

1. After project creation, you'll see a connection string
2. It looks like: `postgresql://username:password@host/database?sslmode=require`
3. **IMPORTANT:** Copy this connection string - you'll need it!

## Step 4: Add Connection String to Vercel

### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your `manpower-view` project
3. Go to "Settings" → "Environment Variables"
4. Add new variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Your Neon connection string (paste it)
   - **Environment:** Select all (Production, Preview, Development)
5. Click "Save"

### Option B: Via Local .env File (For Development)
1. In your project root, create `.env.local` file
2. Add this line:
   ```
   DATABASE_URL="your-neon-connection-string-here"
   ```
3. Save the file
4. **IMPORTANT:** Never commit this file to Git (it's already in .gitignore)

## Step 5: Initialize Database Schema

After setting up the connection string, run:

```bash
npm run db:init
```

This will create the necessary tables in your database.

## Step 6: Seed Initial Data

To populate the database with your CSV data:

```bash
npm run db:seed
```

## Step 7: Deploy to Vercel

```bash
git add .
git commit -m "Add database integration"
git push origin main
```

Vercel will automatically redeploy with the database connection.

## Verification

1. Visit your deployed site: https://manpower-view.vercel.app
2. You should see all 20 employees from the CSV
3. Try editing an employee - changes should persist
4. Open the site on another device - you should see the same data!

## Database Schema

The database has two tables:

### `quotas` table:
- `id` (UUID, Primary Key)
- `name` (VARCHAR) - e.g., "Quota 1"
- `created_at` (TIMESTAMP)

### `employees` table:
- `id` (UUID, Primary Key)
- `quota_id` (UUID, Foreign Key → quotas.id)
- `s_no` (INTEGER)
- `name` (VARCHAR)
- `work` (VARCHAR)
- `come_by` (VARCHAR)
- `state` (VARCHAR)
- `salary` (DECIMAL)
- `joined_date` (DATE)
- `visa_expiration` (DATE)
- `amount_due` (DECIMAL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Troubleshooting

### Error: "DATABASE_URL is not defined"
- Make sure you added the environment variable in Vercel
- For local development, check `.env.local` exists and has the correct URL
- Restart your dev server: `npm run dev`

### Error: "relation does not exist"
- Run `npm run db:init` to create tables
- Check your DATABASE_URL is correct

### Data not showing
- Run `npm run db:seed` to populate initial data
- Check Vercel deployment logs for errors

## Cost

- **Neon Free Tier:** 
  - 0.5 GB storage
  - 1 database
  - Perfect for this application!
  
- **Vercel Free Tier:**
  - Unlimited API requests
  - Perfect for this application!

## Need Help?

- Neon Docs: https://neon.tech/docs
- Vercel Docs: https://vercel.com/docs
- Check the console for error messages

---

**Next Steps:** After completing this setup, all users will see the same data and all changes will sync across devices!