# 🔧 Add DATABASE_URL to Vercel - Step by Step Guide

## Problem
The deployment is failing because the DATABASE_URL environment variable is not set in Vercel.

## Solution: Add DATABASE_URL via Vercel Dashboard

### Step 1: Go to Vercel Dashboard
1. Open your browser and go to: https://vercel.com/dashboard
2. Click on your **manpower-view** project

### Step 2: Navigate to Settings
1. Click on the **Settings** tab at the top
2. In the left sidebar, click on **Environment Variables**

### Step 3: Add DATABASE_URL
1. You'll see a form to add a new environment variable
2. Fill in the following:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_6RnLC3hbGBXO@ep-withered-base-apzmi568.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require`
   - **Environment**: Check **Production**, **Preview**, and **Development**
3. Click **Save**

### Step 4: Redeploy
After adding the environment variable, you need to trigger a new deployment:

**Option A: Via Dashboard**
1. Go to the **Deployments** tab
2. Click on the three dots (...) next to the latest deployment
3. Click **Redeploy**

**Option B: Via Git Push (Recommended)**
Just push any small change to trigger a new deployment:
```bash
cd manpower-view
git commit --allow-empty -m "Trigger redeploy with DATABASE_URL"
git push origin main
```

### Step 5: Verify Deployment
1. Wait 1-2 minutes for the deployment to complete
2. Check the deployment status at: https://vercel.com/dashboard
3. Once it shows "Ready", open: https://manpower-view.vercel.app
4. You should see all 20 employees loaded from the database!

## Alternative: Use Vercel CLI (If Dashboard Doesn't Work)

If you prefer using the command line:

```bash
cd manpower-view

# Add the environment variable
echo 'postgresql://neondb_owner:npg_6RnLC3hbGBXO@ep-withered-base-apzmi568.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require' | vercel env add DATABASE_URL production

# Also add for preview and development
echo 'postgresql://neondb_owner:npg_6RnLC3hbGBXO@ep-withered-base-apzmi568.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require' | vercel env add DATABASE_URL preview

echo 'postgresql://neondb_owner:npg_6RnLC3hbGBXO@ep-withered-base-apzmi568.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require' | vercel env add DATABASE_URL development

# Trigger redeploy
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

## Troubleshooting

### If deployment still fails:
1. Check the build logs in Vercel dashboard
2. Make sure the DATABASE_URL is exactly as shown above (no extra spaces)
3. Verify all three environments (Production, Preview, Development) are checked

### If you see "No data" on the deployed site:
1. The database might be empty
2. Run the seed script locally to populate data:
   ```bash
   cd manpower-view
   npm run db:seed
   ```

## What This Will Fix

Once DATABASE_URL is added to Vercel:
- ✅ Deployment will succeed
- ✅ All 20 employees will be visible on the live site
- ✅ Data will be shared across all devices
- ✅ Any changes (add/edit/delete) will sync to all users
- ✅ No more localStorage limitations!

## Need Help?

If you're still having issues after following these steps, please share:
1. Screenshot of the Environment Variables page in Vercel
2. The error message from the latest deployment
3. What you see when you open the deployed URL