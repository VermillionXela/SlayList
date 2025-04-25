import React, { useEffect, useState } from 'react'
import { getAllHunts } from '../services/hunt.service'
import {HuntCard} from '../components/HuntCard'
import { Header } from '../components/Header'
import styles from '../css/Dashboard.module.css'


export const SlayerDashboardView = () => {
    const [allHunts, setAllHunts] = useState([])
    const slayerSkills = JSON.parse(sessionStorage.getItem('slayer_skills')) 
    console.log(slayerSkills)

    useEffect(() => {
        getAllHunts()
            .then(hunts => setAllHunts(hunts))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
        <Header />

        <div className={styles.pageBackground}>
            <h1 className={styles.header}>Monster Hunting Board</h1>
            <div className={styles.huntCardContainer}>
            {allHunts.map(hunt => (
                <HuntCard key={hunt._id} hunt={hunt} slayerSkills={slayerSkills} />
            ))}
            </div>
        </div>
    </>
    )}

