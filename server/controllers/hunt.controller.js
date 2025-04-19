import Hunt from "../models/hunt.model.js"

export const createHunt = async (req, res, next) => {
    try {
        const {
            monsterName,
            description,
            monsterImage,
            monsterWeaknesses,
            reward,
            guild
        } = req.body

        const HUNT = await Hunt.create({
            monsterName,
            description,
            monsterImage,
            monsterWeaknesses,
            reward,
            guild
        })

        res.status(201).json(HUNT)
    } catch (error) {
        res.status(400).json(error)
    }
}