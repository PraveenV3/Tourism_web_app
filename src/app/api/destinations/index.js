import { query } from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const destinations = (await query('SELECT * FROM destinations')).rows;
    res.status(200).json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving destinations' });
  }
}
