'use client';
// pages/users.tsx
import { useState, useEffect } from 'react';

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '' });

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const user = await response.json();
      setUsers((prevUsers) => [...prevUsers, user]);
      setNewUser({ firstname: '', lastname: '', email: '' });
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstname} {user.lastname} - {user.email}</li>
        ))}
      </ul>
      <h2>Add a new user</h2>
      <input
        type="text"
        placeholder="First Name"
        value={newUser.firstname}
        onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newUser.lastname}
        onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
