import { Router } from 'express'
import { loginSlayer, registerSlayer } from '../controllers/slayer.controller.js'

const slayerRouter = Router()

slayerRouter.route('/register')
    .post(registerSlayer)

slayerRouter.route('/login')
    .post(loginSlayer)    

export default slayerRouter