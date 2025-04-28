import { Router } from 'express'
import { createHunt, deleteHunt, getAllHunts, getHuntById, updateHunt, acceptHunt, completeHunt } from '../controllers/hunt.controller.js'
import { isGuildLoggedIn, isSlayerLoggedIn} from '../middleware/auth.middleware.js'

const huntRouter = Router()

huntRouter.route('/')
    .post(isGuildLoggedIn, createHunt)
    .get(getAllHunts)

huntRouter.route('/:id')
    .get(getHuntById)
    .put(isGuildLoggedIn, updateHunt)
    .delete(isGuildLoggedIn, deleteHunt)

huntRouter.route('/:id/accept')
    .post(isSlayerLoggedIn, acceptHunt)

huntRouter.route('/:id/complete')
    .post(isSlayerLoggedIn, completeHunt)

export default huntRouter