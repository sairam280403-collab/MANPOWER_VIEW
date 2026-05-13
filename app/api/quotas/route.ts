import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Quota } from '@/types/employee';

export const dynamic = 'force-dynamic';

// GET - Fetch all quotas with employees
export async function GET() {
  try {
    // Fetch all quotas
    const quotasResult = await sql`
      SELECT id, name, created_at
      FROM quotas
      ORDER BY name
    `;

    // Fetch all employees
    const employeesResult = await sql`
      SELECT 
        id, quota_id, s_no, name, work, come_by, state,
        salary, joined_date, visa_expiration, amount_due
      FROM employees
      ORDER BY quota_id, s_no
    `;

    // Group employees by quota
    const quotas: Quota[] = quotasResult.map((quota: any) => ({
      id: quota.id,
      name: quota.name,
      employees: employeesResult
        .filter((emp: any) => emp.quota_id === quota.id)
        .map((emp: any) => ({
          id: emp.id,
          sNo: emp.s_no,
          name: emp.name,
          work: emp.work || '',
          comeBy: emp.come_by || '',
          state: emp.state || '',
          salary: parseFloat(emp.salary) || 0,
          joinedDate: emp.joined_date || '',
          visaExpiration: emp.visa_expiration || '',
          amountDue: parseFloat(emp.amount_due) || 0,
        })),
    }));

    return NextResponse.json(quotas);
  } catch (error) {
    console.error('Error fetching quotas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// POST - Create new quota
export async function POST(request: Request) {
  try {
    const { id, name } = await request.json();

    await sql`
      INSERT INTO quotas (id, name)
      VALUES (${id}, ${name})
    `;

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error creating quota:', error);
    return NextResponse.json(
      { error: 'Failed to create quota' },
      { status: 500 }
    );
  }
}

// Made with Bob