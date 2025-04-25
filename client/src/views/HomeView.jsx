import React from 'react'
import { Link } from 'react-router-dom'
import slayLogo from '../assets/slaylist-logo.png'
import styles from '../css/HomeView.module.css'

export const HomeView = () => {
    return (
        <div className={styles.pageBackground}>
            <div className={styles.mainContainer}>
                <img
                    src={slayLogo}
                    alt="SlayList Logo"
                    className={styles.logo}
                />

                <div className={styles.buttonGroup}>
                    <Link to="/slayer/register" className={styles.greenButton}>I want to slay</Link>
                    <Link to="/guild/register" className={styles.yellowButton}>I need a slayer</Link>
                </div>

                <div className={styles.loginLinks}>
                    <Link to="/guild/login">Guild Login</Link>
                    <Link to="/slayer/login">Slayer Login</Link>
                </div>
            </div>
        </div>
    )
}


