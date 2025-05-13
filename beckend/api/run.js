import axios from 'axios';
import connectDB from '../db/index.js';
import dotenv from 'dotenv';
import Cors from 'cors';

dotenv.config();

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST'],
  origin: "https://reactify-code.vercel.app",  // Update with your frontend URL
  credentials: true,  // Enable cookies if needed
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);  // Apply CORS middleware

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
