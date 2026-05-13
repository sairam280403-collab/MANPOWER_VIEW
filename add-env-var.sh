#!/bin/bash

# Script to add DATABASE_URL to Vercel via CLI
# Run this from the manpower-view directory

echo "Adding DATABASE_URL to Vercel..."

# The database URL
DB_URL="postgresql://neondb_owner:npg_6RnLC3hbGBXO@ep-withered-base-apzmi568.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Add to production
echo "$DB_URL" | vercel env add DATABASE_URL production --yes

# Add to preview
echo "$DB_URL" | vercel env add DATABASE_URL preview --yes

# Add to development  
echo "$DB_URL" | vercel env add DATABASE_URL development --yes

echo "Done! Now triggering a redeploy..."
git commit --allow-empty -m "Trigger redeploy with DATABASE_URL"
git push origin main

echo "Deployment triggered! Check https://vercel.com/dashboard for status"

# Made with Bob
