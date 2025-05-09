import { app } from "./app.js";

import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 8001

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