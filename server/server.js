import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongoose.config.js'
import guildRouter from './routes/guild.routes.js'
import slayerRouter from './routes/slayer.routes.js'
import huntRouter from './routes/hunt.routes.js'
import session from 'express-session'

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json(), cors())

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 
    }
}))

app.use('/v1/guild', guildRouter)
app.use('/v1/slayer', slayerRouter)
app.use('/v1/hunt', huntRouter)


dbConnect()

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
)