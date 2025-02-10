
import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudnary.js'

export const signupController = async (req, res) => {

    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Por favor preencha todos os campos necessários." })
        }
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
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Por favor preencha todos os campos necessários" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Conta não encontrada. Verifique os dados o tente novamente." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Senha incorreta." })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePick
        })

    } catch (error) {
        console.log("Internal server error", error.message)
        res.send(500).json({ message: "Internal server error. :(" })
    }
}

export const logoutController = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logado com sucesso!" })
    } catch (error) {
        console.log("Internal server error", error.message)
        res.send(500).json({ message: "Internal server error. :(" })
    }
}

export const updateProfileControlle = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if(!profilePic){
            return res.status(400).message({message: "Imagem de perfil não encontrada."})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const userUpdade = await User.findByIdAndUpdate(userId, {
            profilePick:uploadResponse.secure_url
        },{new: true})

        res.status(200).json(userUpdade)

    } catch (error) {
        console.log("erro ao atualizar usuário.")
        res.status(500).json({message: "Internal server error"})
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth", error.message)
        res.status(500).json({message: "Internal error message."})
    }
}