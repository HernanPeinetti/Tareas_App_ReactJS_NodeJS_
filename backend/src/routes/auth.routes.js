import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

//Registro de usuarios

router.post('/register', async(req, res) =>{
    const {email, password} = req.body

    try{
        //verificar si el usuario ya existe
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message : 'El usuario ya esta registrado'})
        }

        //Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        //Creamos un usuario

        const newUser = new User({email, password: hashedPassword})
        await newUser.save()

        res.status(201).json({message : 'Usuario registrado correctamente'})

    } catch(error){
        res.status(500).json({message : 'Error al registrar usuario'})
    }
})

router.post('/login', async(req, res) =>{
    const {email, password} = req.body
    try {
        //verificar si el usuario existe
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : 'Usuario no encontrado'})
        }

        //comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message : 'Contraseña incorrecta'})
        }

        //Generar token JWT
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )
        res.status(200).json({token, message: 'Login Exitoso'})

    } catch(error){
        res.status(500).json({message: 'Error en el login', error})
    }
})





export default router






