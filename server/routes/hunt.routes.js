import { Router } from 'express'
import { createHunt, deleteHunt, getAllHunts, getHuntById, updateHunt, acceptHunt, completeHunt } from '../controllers/hunt.controller.js'
import { isGuildLoggedIn} from '../middleware/auth.middleware.js'

const huntRouter = Router()

//make sure only Guild can access create,edit,delete functions
huntRouter.route('/')
    .post(createHunt) //isGuildLoggedIn
    .get(getAllHunts)

huntRouter.route('/:id')
    .get(getHuntById)
    .put(updateHunt) //isGuildLoggedIn
    .delete(deleteHunt)  //isGuildLoggedin

huntRouter.route('/:id/accept')
    .post(acceptHunt) //isSlayerLoggedIn

huntRouter.route('/:id/complete')
    .post(completeHunt) //isSlayerLoggedIn

export default huntRouter