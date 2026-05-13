import 'dotenv/config';
import { sql } from '../lib/db';
import { createInitialQuotas } from '../lib/initialData';

async function seedDatabase() {
  console.log('🌱 Seeding database with initial data...\n');

  try {
    const quotas = createInitialQuotas();
    
    console.log(`📊 Found ${quotas.length} quotas with ${quotas.reduce((sum, q) => sum + q.employees.length, 0)} total employees\n`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await sql`DELETE FROM employees`;
    await sql`DELETE FROM quotas`;
    console.log('✅ Existing data cleared\n');

    // Insert quotas and employees
    for (const quota of quotas) {
      console.log(`📝 Inserting ${quota.name}...`);
      
      // Insert quota
      await sql`
        INSERT INTO quotas (id, name)
        VALUES (${quota.id}, ${quota.name})
      `;

      // Insert employees for this quota
      for (const employee of quota.employees) {
        await sql`
          INSERT INTO employees (
            id, quota_id, s_no, name, work, come_by, state,
            salary, joined_date, visa_expiration, amount_due
          )
          VALUES (
            ${employee.id},
            ${quota.id},
            ${employee.sNo},
            ${employee.name},
            ${employee.work},
            ${employee.comeBy},
            ${employee.state},
            ${employee.salary},
            ${employee.joinedDate},
            ${employee.visaExpiration},
            ${employee.amountDue}
          )
        `;
      }
      
      console.log(`   ✅ Inserted ${quota.employees.length} employees`);
    }

    console.log('\n============================================================');
    console.log('✅ Database seeded successfully!');
    console.log('============================================================\n');
    console.log('📊 Summary:');
    console.log(`   - Quotas: ${quotas.length}`);
    console.log(`   - Total Employees: ${quotas.reduce((sum, q) => sum + q.employees.length, 0)}`);
    console.log('\n🌐 Your data is now available to all users!\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

// Made with Bob
