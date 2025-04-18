import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongoose.config.js'
import guildRouter from './routes/guild.routes.js'
import slayerRouter from './routes/slayer.routes.js'

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json(), cors())

app.use('/v1/guild', guildRouter)
app.use('/v1/slayer', slayerRouter)


dbConnect()

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
)