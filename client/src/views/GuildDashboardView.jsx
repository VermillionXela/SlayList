import React, { useEffect, useState } from 'react'
import { getAllHunts } from '../services/hunt.service'
import {HuntCard} from '../components/HuntCard'
import styles from '../css/Dashboard.module.css'

export const GuildDashboardView = () => {
    const [allHunts, setAllHunts] = useState([])

    useEffect(() => {
        getAllHunts()
            .then(hunts => setAllHunts(hunts))
            .catch(error => console.error(error))
    }, [])

    return (
        <div className={styles.pageBackground}>
            <h1 className={styles.header}>Monster Hunting Board</h1>
            <div className={styles.huntCardContainer}>
                {allHunts
                    .filter(hunt => hunt.huntStatus === "Available")
                    .map(hunt => (
                        <HuntCard hunt={hunt} key={hunt._id} />
                    ))}
            </div>
        </div>
    )
}
