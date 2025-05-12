import { app } from "./app.js";

import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 8001

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

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on port: http://localhost:${PORT}`);
        
    })
})
.catch((err)=>{
    console.log(`MongoDB connection Error:- ${err}`);
    
})

app.get('/',(req,res)=>{
    res.send(`Hello world`)
})