import Slayer from "../models/slayer.models.js"
import bcrypt from "bcrypt"

export const registerSlayer = async (req, res, next) => {
    try {
    const { name, email, password, confirmPassword, skills, bio } = req.body

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const SLAYER = await Slayer.create({
        name,
        email,
        password: hashedPassword,
        skills,
        bio
    })

    res.status(201).json(SLAYER)
} catch (error) {
    res.status(400).json(error)
    }
}
