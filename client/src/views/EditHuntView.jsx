import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateHunt, getHuntById } from '../services/hunt.service'
import styles from '../css/HuntForm.module.css'
import { GiMagicSwirl, GiWolfHowl, GiPotionBall, GiSwordman, GiMantrap, GiFootsteps } from 'react-icons/gi'

export const EditHuntView = () => {
    const DEFAULT_HUNT_DATA = {
        monsterName: '',
        description: '',
        reward: '',
        monsterWeaknesses: []
    }

    const HUNT_SKILLS = [
        { name: 'Magic', icon: <GiMagicSwirl /> },
        { name: 'Beast Taming', icon: <GiWolfHowl /> },
        { name: 'Alchemy', icon: <GiPotionBall /> },
        { name: 'Weapons', icon: <GiSwordman /> },
        { name: 'Trap Setting', icon: <GiMantrap /> },
        { name: 'Tracking', icon: <GiFootsteps /> }
    ]

    const [hunt, setHunt] = useState(DEFAULT_HUNT_DATA)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getHuntById(id)
            .then(data => setHunt(data))
            .catch(error => console.error(error))
    }, [id])

    const editHunt = (e) => {
        const { name, value } = e.target;
        setHunt(prev => ({...prev, [name]: name === 'reward' ? Number(value) : value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        updateHunt(id, hunt)
            .then(() => {
                setErrors({})
                navigate('/guild/dashboard')
            })
            .catch(errors => setErrors(errors))
    }
    const toggleSkill = (skillName) => {
        setHunt(prev => {
            const alreadySelected = prev.monsterWeaknesses.includes(skillName)

            const updatedSkills = alreadySelected
                ? prev.monsterWeaknesses.filter(skill => skill !== skillName)
                : [...prev.monsterWeaknesses, skillName]

            return { ...prev, monsterWeaknesses: updatedSkills }
        })
    }

    return (
        <>

            <div className={styles.pageBackground}>
                <div className={styles.formContainer}>
                    <h1 className={styles.header}>What beast troubles you?</h1>
                    <form onSubmit={handleSubmit}>

                        <div className={styles.formInput}>
                            <label>Monster Name:
                                <input
                                    type='text'
                                    name='monsterName'
                                    value={hunt.monsterName}
                                    onChange={editHunt} />
                            </label>
                            {errors.monsterName && <p className={styles.errorText}>{errors.monsterName.message}</p>}
                        </div>

                        <div className={styles.formInput}>
                            <label>Brief Description:
                                <textarea
                                    name='description'
                                    value={hunt.description}
                                    onChange={editHunt} />
                            </label>
                            {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
                        </div>

                        <div className={styles.formInput}>
                            <label>Gold Reward:
                                <input
                                    type='number'
                                    name='reward'
                                    value={hunt.reward}
                                    onChange={editHunt} />
                            </label>
                            {errors.reward && <p className={styles.errorText}>{errors.reward.message}</p>}
                        </div>

                        <p>Skills Required (pick 3):</p>
                        <div className={styles.skillContainer}>
                            {HUNT_SKILLS.map(({ name, icon }) => (
                                <div
                                    key={name}
                                    className={`${styles.skillOption} ${hunt.monsterWeaknesses.includes(name) ? styles.selected : ''}`}
                                    onClick={() => toggleSkill(name)}
                                >
                                    <div className={styles.icon}>{icon}</div>
                                    <div className={styles.skillName}>{name}</div>
                                </div>
                            ))}
                        </div>
                        {errors.monsterWeaknesses && <p className={styles.errorText}>{errors.monsterWeaknesses.message}</p>}


                        <button type='submit' className={styles.submitButton}>Post to Hunting Board</button>
                    </form>
                </div>
            </div>
        </>

    )
}