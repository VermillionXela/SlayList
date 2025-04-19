import { Router } from "express"
import { loginGuild, registerGuild, getAllGuilds, getGuildById } from "../controllers/guild.controller.js"

const guildRouter = Router()

guildRouter.route('/')
    .get(getAllGuilds)

guildRouter.route('/:id')
    .get(getGuildById)

guildRouter.route("/register")
    .post(registerGuild)

guildRouter.route('/login')
    .post(loginGuild)

export default guildRouter 