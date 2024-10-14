import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/dbConfig.js'
import userRoutes from './routes/userRoutes.js'
 
const port = 8000

const app = express()
dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/', userRoutes)

app.listen(port,()=>{
    console.log(`Server running on port: ${port}`)
})