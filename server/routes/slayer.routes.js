import { Router } from 'express'
import { loginSlayer, registerSlayer, getAllSlayers, getSlayerById, logoutSlayer } from "../controllers/slayer.controller.js"

const slayerRouter = Router()


slayerRouter.route('/')
    .get(getAllSlayers)

slayerRouter.route('/:id')
    .get(getSlayerById)

slayerRouter.route('/register')
    .post(registerSlayer)

slayerRouter.route('/login')
    .post(loginSlayer)

slayerRouter.route('/logout')
    .post(logoutSlayer)

export default slayerRouter