import { Router } from 'express'
import { loginSlayer, registerSlayer, getAllSlayers, getSlayerById } from "../controllers/slayer.controller.js"

const slayerRouter = Router()


slayerRouter.route('/')
    .get(getAllSlayers)

slayerRouter.route('/:id')
    .get(getSlayerById)

slayerRouter.route('/register')
    .post(registerSlayer)

slayerRouter.route('/login')
    .post(loginSlayer)    

export default slayerRouter