import express from "express"
import dotenv from 'dotenv'
import authRoutes from '../src/routes/auth.routes.js'
import cookieParser  from 'cookie-parser'

import {connectDB} from './lib/db.js'


const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    console.log(`app listening on port: ${PORT}`)
    connectDB()
    
})