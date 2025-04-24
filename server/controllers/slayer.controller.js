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
            return res.status(400).json(null)
        }

        const isMatch = await bcrypt.compare(password, slayer.password)
        if (!isMatch) {
            return res.status(400).json(null)
        }

        req.session.slayer_id = slayer._id

        const slayerData = slayer.toObject()
        delete slayerData.password

        res.status(200).json(slayerData)
    } catch (error) {
        res.status(400).json(null)
    }
}




export const getAllSlayers = async (req, res, next) => {
    try {
        const slayers = await Slayer.find()
        res.status(200).json(slayers)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getSlayerById = async (req, res, next) => {
    const { id } = req.params
    try {
        const slayer = await Slayer.findById(id)
        res.status(200).json(slayer)
    } catch (error) {
        res.status(400).json(error)
    }
}

//Need to have a method to get slayers accepted hunts and completed hunts to show on their
//dashboard using the populate method
//If time permits: editSlayer, if I give them more of a profile view