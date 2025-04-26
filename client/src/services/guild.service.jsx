import axios from 'axios'

const GUILD_API = axios.create({
    baseURL: 'http://localhost:8000/v1/guild'
})

export const registerGuild = async (newGuild) => {
    try {
        const res = await GUILD_API.post('/register', newGuild)
        return res.data
    } catch (error) { throw error.response.data.errors }
}

export const loginGuild = async (guildCredentials) => {
    try {
        const res = await GUILD_API.post('/login', guildCredentials, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.error }
}

export const logoutGuild = async () => {
    try {
        await GUILD_API.post('/logout', {}, { withCredentials: true })
        sessionStorage.clear()
    } catch (error) {throw error.response.data.errors }
}

export const getGuildById = async (id) => {
    try {
        const res = await GUILD_API.get(`/${id}`)
        return res.data
    } catch (error) { throw error.response.data.errors }
}
