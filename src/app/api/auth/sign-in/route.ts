// pages/api/auth/sign-in.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import crypto from 'crypto';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const [rows] = await db.query('SELECT * FROM user_info WHERE username = ?', [username]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const user = rows[0];

    // ตรวจสอบรหัสผ่าน (คุณอาจต้องใช้วิธีเข้ารหัสที่ปลอดภัยกว่านี้)
    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // สร้างโทเค็นแบบธรรมดา
    const token = crypto.randomBytes(16).toString('hex');

    // เก็บโทเค็นในฐานข้อมูล
    await db.query('UPDATE user_info SET token = ? WHERE id = ?', [token, user.id]);

    return NextResponse.json({ token, user: { id: user.id, username: user.username, user_role: user.user_role } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


