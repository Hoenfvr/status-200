// src/lib/db.ts
import mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';

let connection: Pool;

export const dbConnect = () => {
  if (!connection) {
    connection = mysql.createPool({
      host: 'localhost', // แก้ไขให้ตรงกับการตั้งค่า MySQL ของคุณ
      user: 'root', // ชื่อผู้ใช้ MySQL ของคุณ
      database: 'db_meetingroom', // ชื่อฐานข้อมูลของคุณ
    });
  }
  return connection;
};
