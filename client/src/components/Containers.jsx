import { Outlet } from 'react-router-dom'
import {Header} from './Header' 

export function GuildContainer() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export function SlayerContainer() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
