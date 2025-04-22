import axios from 'axios'

const HUNT_API = axios.create({
    baseURL: 'http://localhost:8000/v1/hunt'
})


export const createHunt = async (newHunt) => {
    try {
        const res = await HUNT_API.post('/', newHunt, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.errors }
}


export const getAllHunts = async () => {
    try {
        const res = await HUNT_API.get('/')
        return res.data
    } catch (error) { throw error.response.data.errors }
}


export const getHuntById = async (id) => {
    try {
        const res = await HUNT_API.get(`/${id}`)
        return res.data
    } catch (error) { throw error.response.data.errors }
}


export const updateHunt = async (id, data) => {
    try {
        const res = await HUNT_API.put(`/${id}`, data, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.errors }
}


export const deleteHunt = async (id) => {
    try {
        const res = await HUNT_API.delete(`/${id}`, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.errors }
}


export const acceptHunt = async (id) => {
    try {
        const res = await HUNT_API.post(`/${id}/accept`, {}, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.errors }
}



export const completeHunt = async (id) => {
    try {
        const res = await HUNT_API.post(`/${id}/complete`, {}, { withCredentials: true })
        return res.data
    } catch (error) { throw error.response.data.errors }
}