// src/app/api/auth/check-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'db_meetingroom',
});

export async function POST(req: NextRequest) {
  const authorization = req.headers.get('authorization');

  console.log('authorization:', authorization); // Log ค่า Authorization
  // console.log('req.headers:', req.headers); // Log ข้อมูล headers ทั้งหมด

  if (!authorization) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  // const token = authorization.split(' ')[1];

  try {
    const [rows] = await db.query('SELECT * FROM user_info WHERE token = ?', [authorization]);

    if (rows.length === 0) {
      return NextResponse.json({ error: '[Check-Token] Invalid token' }, { status: 401 });
    }

    const user = rows[0];

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        user_role: user.user_role,
      },
      
    }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
