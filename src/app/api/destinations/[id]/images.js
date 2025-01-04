import { query } from '../../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const images = (await query('SELECT * FROM images WHERE destination_id = $1', [id])).rows;
    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving images' });
  }
}
