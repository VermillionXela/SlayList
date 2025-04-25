import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createHunt } from '../services/hunt.service'
import styles from '../css/HuntForm.module.css'
import { GiMagicSwirl, GiWolfHowl, GiPotionBall, GiSwordman, GiMantrap, GiFootsteps } from 'react-icons/gi'
import { Header } from '../components/Header'

export const NewHuntView = () => {
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

    const [newHunt, setNewHunt] = useState(DEFAULT_HUNT_DATA)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const updateHunt = e => {
        const { name, value } = e.target
        setNewHunt(prev => ({ ...prev, [name]: value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        newHunt.guild = sessionStorage.getItem('guild_id')
        createHunt(newHunt)
            .then(() => {
                setNewHunt(DEFAULT_HUNT_DATA)
                setErrors({})
                navigate('/guild/dashboard')
            })
            .catch(errors => setErrors(errors))
    }


    const toggleSkill = (skillName) => {
        setNewHunt(prev => {
            const alreadySelected = prev.monsterWeaknesses.includes(skillName)

            const updatedSkills = alreadySelected
                ? prev.monsterWeaknesses.filter(skill => skill !== skillName)
                : [...prev.monsterWeaknesses, skillName]

            return { ...prev, monsterWeaknesses: updatedSkills }
        })
    }

    return (
        <>
            <Header />

            <div className={styles.pageBackground}>
                <div className={styles.formContainer}>
                    <h1 className={styles.header}>What beast troubles you?</h1>
                    <form onSubmit={handleSubmit}>

                        <div className={styles.leftContainer}>
                            <div className={styles.formInput}>
                                <label>Monster Name:
                                    <input
                                        type='text'
                                        name='monsterName'
                                        value={newHunt.monsterName}
                                        onChange={updateHunt} />
                                </label>
                                {errors.monsterName && <p className={styles.errorText}>{errors.monsterName.message}</p>}
                            </div>

                            <div className={styles.formInput}>
                                <label>Brief Description:
                                    <textarea
                                        name='description'
                                        value={newHunt.description}
                                        onChange={updateHunt} />
                                </label>
                                {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
                            </div>

                            <div className={styles.formInput}>
                                <label>Gold Reward:
                                    <input
                                        type='number'
                                        name='reward'
                                        value={newHunt.reward}
                                        onChange={updateHunt} />
                                </label>
                                {errors.reward && <p className={styles.errorText}>{errors.reward.message}</p>}
                            </div>
                        </div>

                        <div className={styles.rightContainer}>
                            <h2>Skills Required (pick 3):</h2>
                            <div className={styles.skillContainer}>

                                {HUNT_SKILLS.map(({ name, icon }) => (
                                    <div key={name}
                                        onClick={() => toggleSkill(name)}>
                                        <div className={styles.icon}>
                                            {icon}
                                        </div>
                                        <div className={styles.skillName}>
                                            {name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.monsterWeaknesses && <p className={styles.errorText}>{errors.monsterWeaknesses.message}</p>}
                        </div>

                        <button type='submit' className={styles.submitButton}>Post to Hunting Board</button>
                    </form>
                </div>
            </div>
        </>
    )
}
