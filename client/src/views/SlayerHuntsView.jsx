import React, { useEffect, useState } from 'react'
import styles from '../css/HuntsTable.module.css'
import { HuntsTable } from '../components/HuntsTable'
import { getSlayerById } from '../services/slayer.service'
import goldIcon from '../assets/icons-gold.png'

export const SlayerHuntsView = () => {
    const [slayer, setSlayer] = useState()
    const slayerId = sessionStorage.getItem('slayer_id')


    useEffect(() => {
        getSlayerById(slayerId)
            .then(setSlayer)
            .catch(error => console.error('Error fetching slayer data:', error))
    }, [slayerId])

    const refreshSlayer = () => {
        getSlayerById(slayerId)
            .then(setSlayer)
            .catch(error => console.error('Error refreshing slayer data:', error))
    }


    if (!slayer) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.pageBackground}>
            <div className={styles.totalGold}>
                <span>Total Gold Earned:</span>
                <img src={goldIcon} alt="Gold" className={styles.goldIcon} />
                <span>{slayer.goldEarned}</span>
            </div>

            <HuntsTable
                key="accepted"
                type="accepted"
                hunts={slayer.acceptedHunts || []}
                refreshSlayer={refreshSlayer}
                goldEarned={slayer.goldEarned}
            />

            <HuntsTable
                key="completed"
                type="completed"
                hunts={slayer.completedHunts || []}
                refreshSlayer={refreshSlayer}
                goldEarned={slayer.goldEarned}
            />


        </div>
    )
}
