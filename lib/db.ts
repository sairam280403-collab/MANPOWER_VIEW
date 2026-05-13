import { neon } from '@neondatabase/serverless';

// Use a placeholder during build time, actual connection happens at runtime
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/placeholder';

export const sql = neon(DATABASE_URL);

// Helper to check if database is properly configured
export function isDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL && process.env.DATABASE_URL !== 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
}

// Made with Bob