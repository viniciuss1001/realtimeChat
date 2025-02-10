import express from "express"
import dotenv from 'dotenv'
import authRoutes from '../src/routes/auth.routes.js'
import {connectDB} from './lib/db.js'
import { protectedRoute } from "./middleware/auth.middleware.js"

const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/auth", protectedRoute,authRoutes)

app.listen(PORT, ()=>{
    console.log(`app listening on port: ${PORT}`)
    connectDB()
    
})