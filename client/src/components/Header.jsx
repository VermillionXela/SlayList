import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../css/Header.module.css'
import { logoutGuild } from '../services/guild.service'
import { logoutSlayer } from '../services/slayer.service'

export const Header = () => {
    const location = useLocation()
    const slayerName = sessionStorage.getItem('slayer_name')
    const guildName = sessionStorage.getItem('guild_name')
    const loggedInSlayer = sessionStorage.getItem('slayer_id')
    const loggedInGuild = sessionStorage.getItem('guild_id')

    const isSlayerDashboard = location.pathname === '/slayer/dashboard'
    const isSlayerHunts = location.pathname === '/slayer/hunts'

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            if (loggedInSlayer) {
                await logoutSlayer()
                navigate('/')
            } else if (loggedInGuild) {
                await logoutGuild()
                navigate('/')
            }
        } catch (error) { console.log(error) }
    }

    return (
        <header className={styles.headerBar}>
            <img
                src="/src/assets/SlayList-Nav-Logo.PNG"
                alt="SlayList navbar logo"
                className={styles.logo}
            />

            {loggedInSlayer && (
                <span className={styles.greeterText}>Welcome, {slayerName}</span>
            )}

            {loggedInGuild && (
                <span className={styles.greeterText}>Welcome, {guildName}</span>
            )}
            <div className={styles.navLinks}>
                {loggedInGuild && (
                    <>
                        <button onClick={() => navigate('/guild/dashboard')} className={styles.navButton}>
                            Hunting Board
                        </button>
                        <button onClick={handleLogout} className={styles.navButton}>
                            Farewell
                        </button>
                    </>
                )}

                {loggedInSlayer && isSlayerDashboard && (
                    <>
                        <button onClick={() => navigate('/slayer/hunts')} className={styles.navButton}>
                            My Hunts
                        </button>
                        <button onClick={handleLogout} className={styles.navButton}>
                            Farewell
                        </button>
                    </>
                )}

                {loggedInSlayer && isSlayerHunts && (
                    <>
                        <button onClick={() => navigate('/slayer/dashboard')} className={styles.navButton}>
                            Hunting Board
                        </button>
                        <button onClick={handleLogout} className={styles.navButton}>
                            Farewell
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}
