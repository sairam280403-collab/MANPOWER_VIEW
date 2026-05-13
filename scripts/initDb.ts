import 'dotenv/config';
import { sql } from '../lib/db';

async function initDatabase() {
  console.log('🚀 Initializing database...\n');

  try {
    // Create quotas table
    console.log('📋 Creating quotas table...');
    await sql`
      CREATE TABLE IF NOT EXISTS quotas (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Quotas table created\n');

    // Create employees table
    console.log('📋 Creating employees table...');
    await sql`
      CREATE TABLE IF NOT EXISTS employees (
        id TEXT PRIMARY KEY,
        quota_id TEXT NOT NULL REFERENCES quotas(id) ON DELETE CASCADE,
        s_no INTEGER NOT NULL,
        name TEXT NOT NULL,
        work TEXT,
        come_by TEXT,
        state TEXT,
        salary DECIMAL(10, 2) DEFAULT 0,
        joined_date TEXT,
        visa_expiration TEXT,
        amount_due DECIMAL(10, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Employees table created\n');

    // Create index for faster queries
    console.log('📋 Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_employees_quota_id ON employees(quota_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_employees_s_no ON employees(s_no)`;
    console.log('✅ Indexes created\n');

    console.log('============================================================');
    console.log('✅ Database initialized successfully!');
    console.log('============================================================\n');
    console.log('Next step: Run `npm run db:seed` to populate with initial data\n');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();

// Made with Bob
