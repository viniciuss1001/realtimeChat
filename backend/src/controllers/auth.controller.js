
import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signupController = async (req, res) => {

    const { fullName, email, password } = req.body

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "A senha precisa ter no mínimo 6 caracteres." })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "Esse email já está registrado em uma conta." })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            //generate JWT token
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePick
            })

        } else {
            res.status(400).message({ message: "Dados inseridos inválidos." })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({message: "Internal Server Error."})
    }
}

export const loginController = (req, res) => {
    res.send("login page")
}

export const logoutController = (req, res) => {
    res.send("logout page")
}