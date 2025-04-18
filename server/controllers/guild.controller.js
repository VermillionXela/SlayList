import Guild from "../models/guild.models.js"
import bcrypt from "bcrypt"


export const registerGuild = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const GUILD = await Guild.create({
        name,
        email,
        password: hashedPassword,
    })

    res.status(201).json(GUILD)
} catch (error) {
    res.status(400).json(error)
}
}
