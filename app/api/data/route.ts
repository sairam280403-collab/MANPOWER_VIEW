import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'employees.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// GET - Fetch employee data
export async function GET() {
  try {
    ensureDataDir();
    
    if (!fs.existsSync(DATA_FILE)) {
      // Return initial data if file doesn't exist
      const { createInitialQuotas } = await import('@/lib/initialData');
      const initialData = createInitialQuotas();
      return NextResponse.json(initialData);
    }
    
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// POST - Save employee data
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const data = await request.json();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

// Made with Bob
