import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

// PUT - Update employee
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {
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
    const { id } = params;

    await sql`
      UPDATE employees
      SET 
        s_no = ${sNo},
        name = ${name},
        work = ${work || ''},
        come_by = ${comeBy || ''},
        state = ${state || ''},
        salary = ${salary || 0},
        joined_date = ${joinedDate || ''},
        visa_expiration = ${visaExpiration || ''},
        amount_due = ${amountDue || 0}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    );
  }
}

// DELETE - Delete employee
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await sql`
      DELETE FROM employees
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    );
  }
}

// Made with Bob