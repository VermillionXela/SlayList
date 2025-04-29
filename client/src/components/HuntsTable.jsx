import React from 'react'
import styles from '../css/HuntsTable.module.css'
import { completeHunt } from '../services/hunt.service'

export const HuntsTable = ({ type, hunts, refreshSlayer }) => {

    const handleComplete = async (huntId) => {
        try {
            await completeHunt(huntId)
            refreshSlayer() 
        } catch (error) {
            console.error('Failed to complete hunt:', error)
        }
    }


    if (type === 'accepted') {
        return (
            <div className={styles.huntsSection}>
                <h1 className={styles.header}>Accepted Hunts</h1>
                {hunts.length === 0 ? (
                    <p className={styles.noHunts}>No hunts currently accepted.</p>
                ) : (
                    <table className={styles.huntsTable}>
                        <thead>
                            <tr>
                                <th>Monster</th>
                                <th>Posted By</th>
                                <th>Slain?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hunts.map(hunt => {
                                console.log('hunt:', hunt)
                                return (
                                    <tr key={hunt._id}>
                                        <td>{hunt.monsterName}</td>
                                        <td>{hunt.guild.name}</td>
                                        <td>
                                            <button onClick={() => handleComplete(hunt._id)} className={styles.ayeButton}>
                                                Aye!
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }

    if (type === 'completed') {
        return (
            <div className={styles.huntsSection}>
                <h2 className={styles.header}>Completed Hunts</h2>
                {hunts.length === 0 ? (
                    <p className={styles.noHunts}>No completed hunts yet.</p>
                ) : (
                    <table className={styles.huntsTable}>
                        <thead>
                            <tr>
                                <th>Monster</th>
                                <th>Posted By</th>
                                <th>Gold Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hunts.map(hunt => (
                                <tr key={hunt._id}>
                                    <td>{hunt.monsterName}</td>
                                    <td>{hunt.guild?.name}</td>
                                    <td>{hunt.reward} Pieces</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }

    return null
}
