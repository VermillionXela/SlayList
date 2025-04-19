import Guild from "../models/guild.model.js"
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

export const loginGuild = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const guild = await Guild.findOne({ email })
            if (!guild) {
            return res.status(400).json({ error: "Invalid login" })
        }

        const isMatch = await bcrypt.compare(password, guild.password)
            if (!isMatch) {
            return res.status(400).json({ error: "Invalid login" })
        }

        const guildData = guild.toObject()
        delete guildData.password


        res.status(200).json(guildData)
    } catch (error) {
        res.status(400).json(error)
    }
}

// To Do: getAllGuilds, getGuildById