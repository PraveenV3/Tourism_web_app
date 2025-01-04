import { query } from '../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const destination = (await query('SELECT * FROM destinations WHERE destination_id = $1', [id])).rows[0];

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json(destination);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving destination' });
  }
}
