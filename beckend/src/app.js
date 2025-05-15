import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

// Configure allowed origins
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
];

// Configure CORS
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser());

import userRouter from './routes/user.router.js'
import fileRouter from './routes/file.router.js'

app.use("/api/v1/user", userRouter)
app.use("/api/v1/file", fileRouter)

// Add OPTIONS handling for preflight requests
app.options('*', cors())

export { app }