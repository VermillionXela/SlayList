import { Router } from "express"
import { registerGuild } from "../controllers/guild.controller.js"

const guildRouter = Router()

guildRouter.route("/register")
    .post(registerGuild)

export default guildRouter 