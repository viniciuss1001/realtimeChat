import jwt, { decode } from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message:"Acesso não autorizado. "})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Acesso não autorizado. "})
        }

        const user = await User.findById(decode.userId).select("-password")

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado."})
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Error")
        res.status(500).json({message: "Internal error server. "})
    }
}