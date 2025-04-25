import React from 'react'
import styles from '../css/HuntCard.module.css'
import { acceptHunt, deleteHunt } from '../services/hunt.service'
import { GiMagicSwirl, GiWolfHowl, GiPotionBall, GiSwordman, GiMantrap, GiFootsteps } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'


export const HuntCard = ({ hunt, slayerSkills }) => {
    const SKILL_MAP = {
        'Magic': <GiMagicSwirl />,
        'Beast Taming': <GiWolfHowl />,
        'Alchemy': <GiPotionBall />,
        'Weapons': <GiSwordman />,
        'Trap Setting': <GiMantrap />,
        'Tracking': <GiFootsteps />
    }

    const { monsterName, description, reward, monsterWeaknesses, guild } = hunt

    const slayerId = sessionStorage.getItem('slayer_id')
    const guildId = sessionStorage.getItem('guild_id')
    const navigate = useNavigate()

    //TODO: calculate odds using slayerSkills vs monsterWeaknesses

    const handleAccept = async (huntId) => {
        try {
            await acceptHunt(huntId)
            console.log('Hunt accepted')
        } catch (error) { console.error('Error accepting hunt:', error) }
    }

    const handleDelete = async (huntId) => {
        try {
            await deleteHunt(huntId)
            console.log('Hunt deleted')
        } catch (error) { console.error('Error deleting hunt:', error) }
    }

    return (
        <div className={styles.huntCard}>
            <div className={styles.leftcolumn}>
                <div className={styles.guildTextTop}>
                    The esteemed Guild, <span className={styles.postedBy}>{guild.name}</span>,
                </div>
                <div className={styles.guildTextBottom}>
                    requests the slaying of:
                </div>

                <h2 className={styles.monsterName}>
                    {monsterName}
                </h2>

                <p className={styles.description}>
                    "{description}"
                </p>
            </div>

            <div className={styles.rightcolumn}>

                <div className={styles.skillContainer}>
                    <p className={styles.skillHeader}>Required Skills:</p>
                    <div className={styles.skillMap}>
                        {monsterWeaknesses.map((name) => (
                            <div key={name} className={styles.skill}>

                                <div className={styles.icon}>{SKILL_MAP[name]}</div>
                                <div className={styles.skillName}>{name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                        {/* TODO: Your Odds: conditonal rendering with green text if odds are above 55% and red if below 55%*/}

                <p className={styles.reward}>Reward: <span className={styles.rewardGold}>{reward} gold tokens</span></p>

                <div className={styles.buttonRow}>
                    {guildId && guildId === guild?._id && (
                        <>
                            <button
                                onClick={() => navigate(`/guild/hunts/${hunt._id}/edit`)}
                                className={styles.editButton}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(hunt._id)}
                                className={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </>
                    )}

                    {slayerId && (
                        <button
                            type="submit"
                            onClick={() => {
                                handleAccept(hunt._id)
                                navigate("/slayer/hunts")
                            }}
                            className={styles.acceptButton}
                        >
                            Accept Hunt
                        </button>
                    )}
                </div>

            </div>
        </div>
    )
}