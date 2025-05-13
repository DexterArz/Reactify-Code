import axios from 'axios';
import connectDB from '../db/index.js';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  try {
    await connectDB(); // optional if DB is used

    const { language, version, files } = req.body;

    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language,
      version,
      files,
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
