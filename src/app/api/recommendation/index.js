import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, destination_id, recommendation_text } = req.body;

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    try {
      const result = await client.query(
        'INSERT INTO recommendations (user_id, destination_id, recommendation_text) VALUES ($1, $2, $3) RETURNING *',
        [user_id, destination_id, recommendation_text]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit recommendation' });
    } finally {
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
