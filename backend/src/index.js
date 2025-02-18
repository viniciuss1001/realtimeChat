import express from "express"
import dotenv from 'dotenv'
import cookieParser  from 'cookie-parser'
import cors from 'cors'

import {connectDB} from './lib/db.js'

import authRoutes from '../src/routes/auth.routes.js'
import messageRoute from '../src/routes/message.route.js'

const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    Credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoute)

app.listen(PORT, ()=>{
    console.log(`app listening on port: ${PORT}`)
    connectDB()
    
})