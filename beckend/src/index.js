import { app } from "./app.js";
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import cors from 'cors';
import axios from 'axios'; // ← make sure axios is installed

// Load environment variables
dotenv.config({
  path: "./.env"
});

// Enable CORS for Vercel frontend
app.use(cors({
  origin: 'https://your-frontend.vercel.app', // 🔁 Replace with your actual Vercel frontend URL
  credentials: true
}));

const PORT = process.env.PORT || 8001;

// Example POST route
app.post("/api/run", async (req, res) => {
  try {
    const { language, version, files } = req.body;
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version,
      files,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example GET route
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection Error: ${err}`);
  });
