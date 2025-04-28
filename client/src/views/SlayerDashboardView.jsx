import React, { useEffect, useState } from 'react'
import { getAllHunts } from '../services/hunt.service'
import { HuntCard } from '../components/HuntCard'
import styles from '../css/Dashboard.module.css'


export const SlayerDashboardView = () => {
    const [allHunts, setAllHunts] = useState([])
    const slayerSkills = JSON.parse(sessionStorage.getItem('slayer_skills'))
    console.log(slayerSkills)

    const refreshHunts = () => {
        getAllHunts()
            .then(hunts => setAllHunts(hunts))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        refreshHunts()
    }, [])

    return (
        <>

            <div className={styles.pageBackground}>
                <h1 className={styles.header}>Monster Hunting Board</h1>
                <div className={styles.huntCardContainer}>
                    {allHunts
                        .filter(hunt => hunt.huntStatus === "Available")
                        .map(hunt => (
                            <HuntCard hunt={hunt} key={hunt._id} slayerSkills={slayerSkills} refreshHunts={refreshHunts} />
                        ))}
                </div>
            </div>
        </>
    )
}

