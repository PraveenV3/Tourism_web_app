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
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
        [name, email, message]
      );
      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error saving message:', error);
      return res.status(500).json({ message: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
