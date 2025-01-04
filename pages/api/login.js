import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Set to true if you want to enforce certificate validation
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }

    try {
      // Check if the user exists with the given email
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the password matches
      const user = result.rows[0];
      if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      return res.status(200).json({
        message: 'Login successful!',
        user,
      });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
