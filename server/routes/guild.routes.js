import { Router } from "express"
import { loginGuild, registerGuild } from "../controllers/guild.controller.js"

const guildRouter = Router()

guildRouter.route("/register")
    .post(registerGuild)

guildRouter.route('/login')
    .post(loginGuild)

export default guildRouter 