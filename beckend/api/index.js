import { app } from "../src/app.js";
import dotenv from 'dotenv';
import connectDB from "../src/db/index.js";
import axios from 'axios';

dotenv.config({
    path: "../.env"
});

// Connect to MongoDB
let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }
    try {
        await connectDB();
        isConnected = true;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Define routes
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

app.get('/', (req, res) => {
    res.send(`Hello world`);
});

// Export the Express API
export default async function handler(req, res) {
    try {
        await connectToDatabase();
        return app(req, res);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
} 