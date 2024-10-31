// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'db_meetingroom',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await mysql.createConnection(dbConfig);

  if (req.method === 'POST') {
    const { firstName, lastName, username, password } = req.body;

    const [result] = await connection.execute('INSERT INTO user_info (firstName, lastName, username, password) VALUES (?, ?, ?, ?)', [firstName, lastName, username, password]);

    res.status(201).json({ id: result.insertId });
  } else {
    const [users] = await connection.execute('SELECT * FROM user_info');
    res.status(200).json(users);
  }

  await connection.end();
}
