import { Router } from 'express'
import { createHunt } from '../controllers/hunt.controller.js'

const huntRouter = Router()

huntRouter.route('/')
    .post(createHunt)

export default huntRouter