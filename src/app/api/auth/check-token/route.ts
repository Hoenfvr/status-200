// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
  user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
  database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
});

export async function POST(req: NextApiRequest) {
  
          const  authorization  = req.headers.authorization;
          console.log('POST /api/auth/sign-in authorization : ', authorization);
          // ตรวจสอบว่า authorization header มีหรือไม่
          if (!authorization) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
          }
        
          const token = authorization.split(' ')[1]; // รับโทเค็นจาก header
        
          try {
            // ตรวจสอบและถอดรหัส JWT
            const decoded = jwt.verify(token, secretKey) as { id: number; username: string };
        
            // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
            const [rows] = await db.query('SELECT * FROM user_info WHERE id = ?', [decoded.id]);
        
            if (rows.length === 0) {
              return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
        
            const user = rows[0];
        
            // ส่ง response กลับไปยัง client
            return NextResponse.json({ id: user.id, username: user.username }, { status: 200 });
          } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
          }
        }