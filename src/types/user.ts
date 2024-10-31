export interface User {
  id: number; // แก้ไขจาก user_id เป็น id หากใช้คอลัมน์ id
  username: string; // ใช้ username แทน email
  password: string; // รหัสผ่าน
  token: string | null; // โทเค็นที่อาจเป็น NULL
  user_role: 'user' | 'admin'; // ประเภทผู้ใช้
  [key: string]: unknown;
}
