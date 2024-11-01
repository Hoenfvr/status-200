// src/app/api/employees/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

// GET API สำหรับดึงข้อมูลพนักงานทั้งหมด
export async function GET(req: NextRequest) {
  try {
    const [rows] = await db.query('SELECT * FROM employee_info'); // ดึงข้อมูลพนักงานทั้งหมด

    console.log('[rows] in server employee :', [rows]);

    return NextResponse.json(rows, { status: 200 }); // ส่งกลับข้อมูล
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
