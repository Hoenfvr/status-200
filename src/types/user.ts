export interface User {
  user_id: number; // ใช้ user_id แทน id
  username: string; // ใช้ username แทน email
  password: string; // password ที่ตรงกับ mock data
  user_role: 'user' | 'admin'; // user_type ที่กำหนดประเภทของผู้ใช้
  firstname: string;
  lastname: string;
  [key: string]: unknown;
}
