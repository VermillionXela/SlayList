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

//To Do: getAllHunts, getHuntById, updateHunt, deleteHunt

//acceptHunt - sets huntStatus to "accepted", slayerAccepted then
//receives that slayer's ID. Add Hunt to array of accepted hunts.

//completeHunt - sets huntStatus to "completed", isCompleted to "true",
// add Slayer ID to slayerCOmpleted, add hunt to array of completedHunts, 
// add reward into goldEarned.