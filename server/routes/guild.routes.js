import { Router } from "express"
import { loginGuild, registerGuild, getAllGuilds, getGuildById,logoutGuild } from "../controllers/guild.controller.js"

const guildRouter = Router()

guildRouter.route('/')
    .get(getAllGuilds)

guildRouter.route('/:id')
    .get(getGuildById)

guildRouter.route("/register")
    .post(registerGuild)

guildRouter.route('/login')
    .post(loginGuild)

guildRouter.route('/logout')
    .post(logoutGuild)    

export default guildRouter 