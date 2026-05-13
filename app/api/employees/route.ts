import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST - Create new employee
export async function POST(request: Request) {
  try {
    const {
      id,
      quotaId,
      sNo,
      name,
      work,
      comeBy,
      state,
      salary,
      joinedDate,
      visaExpiration,
      amountDue,
    } = await request.json();

    await sql`
      INSERT INTO employees (
        id, quota_id, s_no, name, work, come_by, state,
        salary, joined_date, visa_expiration, amount_due
      )
      VALUES (
        ${id}, ${quotaId}, ${sNo}, ${name}, ${work || ''}, ${comeBy || ''}, ${state || ''},
        ${salary || 0}, ${joinedDate || ''}, ${visaExpiration || ''}, ${amountDue || 0}
      )
    `;

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}

// Made with Bob