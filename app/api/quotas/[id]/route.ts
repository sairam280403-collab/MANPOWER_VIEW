import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

// PUT - Update quota name
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { name } = await request.json();
    const { id } = await params;

    await sql`
      UPDATE quotas
      SET name = ${name}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating quota:', error);
    return NextResponse.json(
      { error: 'Failed to update quota' },
      { status: 500 }
    );
  }
}

// DELETE - Delete quota and all its employees
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete all employees in this quota first (due to foreign key constraint)
    await sql`
      DELETE FROM employees
      WHERE quota_id = ${id}
    `;

    // Then delete the quota
    await sql`
      DELETE FROM quotas
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting quota:', error);
    return NextResponse.json(
      { error: 'Failed to delete quota' },
      { status: 500 }
    );
  }
}

// Made with Bob