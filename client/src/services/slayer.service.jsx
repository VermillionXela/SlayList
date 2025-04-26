import axios from 'axios'

const SLAYER_API = axios.create({
    baseURL: 'http://localhost:8000/v1/slayer'
})


export const registerSlayer = async (newSlayer) => {
    try {
        const res = await SLAYER_API.post('/register', newSlayer)
        return res.data
    } catch (error) { throw error.response.data.errors }
}

export const loginSlayer = async (slayerCredentials) => {
    try {
        const res = await SLAYER_API.post('/login', slayerCredentials, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.error }

}


export const logoutSlayer = async () => {
    try {
        await SLAYER_API.post('/logout', {}, { withCredentials: true })
        sessionStorage.clear()
    } catch (error) { throw error.response.data.errors }
}

export const getSlayerById = async (id) => {
    try {
        const res = await SLAYER_API.get(`/${id}`)
        return res.data
    } catch (error) { throw error.response.data.errors }
}