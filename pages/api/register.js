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
    const { full_name, email, country, mobile_number, password } = req.body;

    if (!full_name || !email || !country || !mobile_number || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
      const query = 'INSERT INTO users (full_name, email, country, mobile_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [full_name, email, country, mobile_number, password];

      const result = await pool.query(query, values);
      
    
      return res.status(200).json({
        message: 'Registration successful!',
        user: result.rows[0], 
      });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
