// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.json();

  try {
    const [rows] = await db.query('SELECT * FROM user_info WHERE username = ?', [username]);

    if (rows.length === 0) {
      // return res.status(401).json({ error: 'Invalid username or password' });
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const user = rows[0];

    // ตรวจสอบรหัสผ่าน
    if (user.password !== password) {
      // return res.status(401).json({ error: 'Invalid username or password' });
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // สร้างโทเค็นแบบธรรมดา
    const token = crypto.randomBytes(16).toString('hex'); // สร้างโทเค็นที่มีความยาว 32 ตัวอักษร (16 ไบต์)

    // เก็บโทเค็นในฐานข้อมูล
    await db.query('UPDATE user_info SET token = ? WHERE id = ?', [token, user.id]);

    // ส่ง response กลับไปยัง client พร้อมโทเค็น
    // return res.status(200).json({ token, user: { id: user.id, username: user.username } });
    return NextResponse.json({ token, user: { id: user.id, username: user.username, user_role: user.user_role } }, { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: 'Internal Server Error' });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



