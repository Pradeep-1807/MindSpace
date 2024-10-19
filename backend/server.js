import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig.js'
import userRoutes from './routes/userRoutes.js'
 
const port = 8000

const app = express()
dotenv.config()

connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL,  // Allow the frontend origin
    credentials: true,                // Allow credentials (cookies, authorization headers, etc.)
  }));
  
app.use(cookieParser())
app.use(express.json())
app.use('/', userRoutes)

app.listen(port,()=>{
    console.log(`Server running on port: ${port}`)
})