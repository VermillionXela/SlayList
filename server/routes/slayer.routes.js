import { Router } from 'express'


const slayerRouter = Router()

//only slayers will be able to see their personal dashboard and accepted hunts page for now
slayerRouter.route('/register')
    .post(registerSlayer)

slayerRouter.route('/login')
    .post(loginSlayer)    

export default slayerRouter