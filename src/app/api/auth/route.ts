// pages/api/auth/login.ts
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

const secretKey = 'your_secret_key'; // คีย์สำหรับสร้าง JWT

export async function POST(req: NextApiRequest) {
  const { username, password } = await req.json(); // ใช้ req.json() แทนการใช้ JSON.parse

  try {
    // ตรวจสอบผู้ใช้ในฐานข้อมูล
    const [rows] = await db.query('SELECT * FROM user_info WHERE username = ?', [username]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const user = rows[0];

    // ตรวจสอบรหัสผ่าน (กรุณาใช้ bcrypt หรือวิธีการเข้ารหัสที่เหมาะสม)
    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // สร้าง JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    // เก็บ token ในฐานข้อมูล
    await db.query('UPDATE user_info SET token = ? WHERE id = ?', [token, user.id]);

    // ส่ง response กลับไปยัง client
    return NextResponse.json({ token, user: { id: user.id, username: user.username } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
