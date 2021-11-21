import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto-js'
import randomBytes from 'randombytes'

import User from '../models/user.js'

export const signin = async (req, res) => {
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ messaage :"User doesnt exist." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password"})
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exist." })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: '1h' })

        res.status(200).json({ result: result, token})
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ messaage :"User doesnt exist." })
        }

        const token = jwt.sign({ id: existingUser._id }, 'secret', { expiresIn: '1h' })

        const resetUrl = `http://localhost:3000/resetPassword/${token}`;

        const message = `
            <h3>Dear ${existingUser.name},</h3>
            <p>You requested for a password reset, kindly use this <a href="{{url}}">link</a> to reset your password</p>
            <br>
            <p>Cheers!</p>
        `
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
}