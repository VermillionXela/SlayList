import { Router } from 'express'
import { createHunt } from '../controllers/hunt.controller.js'
import { isGuildLoggedIn} from '../middleware/auth.middleware.js'

const huntRouter = Router()

//make sure only Guild can access create,edit,delete functions
huntRouter.route('/')
    .post(isGuildLoggedIn, createHunt)

export default huntRouter