import Hunt from "../models/hunt.model.js"
import Slayer from "../models/slayer.model.js"


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

export const getAllHunts = async (req, res, next) => {
    try {
        const hunts = await Hunt.find().populate({
            path: 'guild',
            select: 'name'
        })
        console.log(hunts) 

        res.status(200).json(hunts)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getHuntById = async (req, res, next) => {
    const { id } = req.params
    try {
        const hunt = await Hunt.findById(id).populate({
            path: 'guild',
            select: 'name'
        })

    if (!hunt) {
        return res.status(404).json({ error: 'No hunt found' })
    }

        res.status(200).json(hunt)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateHunt = async (req, res, next) => {
    const { id } = req.params
    const OPTIONS = {
        new: true,
        runValidators: true
    }

    try {
        const hunt = await Hunt.findByIdAndUpdate(id, req.body, OPTIONS).populate({
            path: 'guild',
            select: 'name'
        })

    if (!hunt) {
        return res.status(404).json({ error: 'No hunt found to edit' })
    }

        res.status(200).json(hunt)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteHunt = async (req, res, next) => {
    const { id } = req.params
    try {
        const hunt = await Hunt.findByIdAndDelete(id)

        if (!hunt) {
            return res.status(404).json({ error: "No hunt found to delete" })
    }

        res.status(200).json(hunt) 
    } catch (error) {
        res.status(400).json(error)
    }
}

export const acceptHunt = async (req, res, next) => {
    try {
        const { id } = req.params 
        const slayerId = req.session.slayer_id 

        const hunt = await Hunt.findById(id)
        if (!hunt) {
            return res.status(404).json({ error: 'Hunt not found' })
        }

        hunt.huntStatus = 'Accepted'
        hunt.slayerAccepted = slayerId
        await hunt.save()

        const slayer = await Slayer.findById(slayerId)
        if (!slayer) {
            return res.status(404).json({ error: 'Slayer not found ' })
        }

        if (!slayer.acceptedHunts.includes(hunt._id)) {
            slayer.acceptedHunts.push(hunt._id)
            await slayer.save()
        }

        res.status(200).json(hunt)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const completeHunt = async (req, res, next) => {
    try {
        const { id } = req.params
        const slayerId = req.session.slayer_id

        const hunt = await Hunt.findById(id)
        if (!hunt) {
            return res.status(404).json({ error: 'No hunt found' })
        }

        hunt.huntStatus = 'Completed'
        hunt.isCompleted = true
        hunt.slayerCompleted = slayerId

        await hunt.save() 

        const slayer = await Slayer.findById(slayerId)
        if (!slayer) {
            return res.status(404).json({ error: 'Slayer not found' });
        }

        if (!slayer.completedHunts.includes(hunt._id)) {
        slayer.completedHunts.push(hunt._id)
        }

        slayer.goldEarned += hunt.reward

        await slayer.save()

        res.status(200).json(hunt )
    } catch (error) {
        res.status(400).json(error)
    }
}


