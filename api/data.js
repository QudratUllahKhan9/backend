import connectMongo from '../utils/connectMongo.js';
import Data from '../models/Data.js';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectMongo();
    const data = await Data.findOne({ id });

    if (!data) return res.status(404).json({ message: 'Not found' });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
