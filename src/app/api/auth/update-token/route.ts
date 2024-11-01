import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'db_meetingroom',
});

export async function POST(req: NextRequest) {
  const { username, token } = await req.json(); // รับ username และ token จาก body

  if (!username || !token) {
    return NextResponse.json({ error: 'Username and token are required' }, { status: 400 });
  }

  try {
    // อัปเดตโทเคนในฐานข้อมูล
    const [result] = await db.query('UPDATE user_info SET token = ? WHERE username = ?', [token, username]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Token updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
