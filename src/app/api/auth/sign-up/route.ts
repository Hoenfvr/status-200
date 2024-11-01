// pages/api/auth/sign-up.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

export async function POST(req: NextRequest) {
  const { firstName, lastName, username, password } = await req.json();

  try {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password, // คุณอาจจะต้องแฮชรหัสผ่านที่นี่
      user_type: 'user', // กำหนด user_type เป็น 'user' โดยค่าเริ่มต้น
    };

    const [result] = await db.query('INSERT INTO user_info SET ?', userData);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
