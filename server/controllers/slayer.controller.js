import Slayer from "../models/slayer.model.js"
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

export const loginSlayer = async (req, res) => {
    try {
        const { email, password } = req.body

        const slayer = await Slayer.findOne({ email })
        if (!slayer) {
            console.log('Testing')
            return res.status(400).json({ error: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, slayer.password)
        if (!isMatch) {
            return res.status(400).json({ error: "invalid credentials" })
        }

        req.session.slayer_id = slayer._id

        const slayerData = slayer.toObject()
        delete slayerData.password

        res.status(200).json(slayerData)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const logoutSlayer = (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.status(200).json(null)
}


export const getSlayerById = async (req, res) => {
    const { id } = req.params
    try {
        const slayer = await Slayer.findById(id)
            .populate({
                path: 'acceptedHunts',
                populate: { path: 'guild' }
            })
            .populate({
                path: 'completedHunts',
                populate: { path: 'guild' }
            })
        res.status(200).json(slayer)
    } catch (error) {
        res.status(400).json(error)
    }
}



