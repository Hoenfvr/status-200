// pages/api/auth/check-token.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

export async function POST(req: NextRequest) {
  // const { authorization:any } = req.headers;
  const authorization = req.headers.get('authorization');

  console.log('authorization in check-token : ', authorization);

  // ตรวจสอบว่า Authorization header มีหรือไม่
  if (!authorization) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authorization.split(' ')[1]; // แยกโทเค็นจาก header

  console.log('token in check-token => after split : ', token);

  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้โทเค็น
    const [rows] = await db.query('SELECT * FROM user_info WHERE token = ?', [token]);
    
    console.log('[rows] in check-token : ', rows);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid token in get-user server' }, { status: 401 });
    }

    const user = rows[0];

    // ส่ง response กลับไปยัง client พร้อมข้อมูลผู้ใช้
    return NextResponse.json(
      {
        user: {
          id: user.id,
          username: user.username,
          user_role: user.user_role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
