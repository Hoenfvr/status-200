import React from 'react';
import { useHistory } from 'react-router-dom';
import paths from 'path';

const logout = () => {
  // ลบ token หรือ session ที่เก็บไว้
  localStorage.removeItem('token'); // หรือ sessionStorage.removeItem('token');

  // เปลี่ยนเส้นทางไปยังหน้า sign-in
  const history = useHistory();
  history.push(paths.auth.signIn);
};

// ปุ่ม logout
const LogoutButton: React.FC = () => {
  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;