import Guild from "../models/guild.model.js"
import bcrypt from "bcrypt"


export const registerGuild = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const guild = await Guild.create({
        name,
        email,
        password: hashedPassword,
    })

        res.status(201).json(guild)
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

export const getAllGuilds = async (req, res, next) => {
    try {
        const guilds = await Guild.find()
        res.status(200).json(guilds)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getGuildById = async (req, res, next) => {
    const { id } = req.params
    try {
        const guild = await Guild.findById(id)
        res.status(200).json(guild)
    } catch (error) {
        res.status(400).json(error)
    }
}