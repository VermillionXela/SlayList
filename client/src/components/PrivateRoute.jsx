import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = ({ role }) => {
    const guildId = sessionStorage.getItem('guild_id')
    const slayerId = sessionStorage.getItem('slayer_id')

    if (role === 'guild' && !guildId) {
        return <Navigate to="/guild/login" />
    }

    if (role === 'slayer' && !slayerId) {
        return <Navigate to="/slayer/login" />
    }

    return <Outlet />
}
