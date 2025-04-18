import { Router } from 'express'
import { registerSlayer } from '../controllers/slayer.controller.js'

const slayerRouter = Router()

slayerRouter.route('/register')
    .post(registerSlayer)

export default slayerRouter