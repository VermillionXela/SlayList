import React, { useState } from 'react'
import { registerSlayer } from '../services/slayer.service'
import { useNavigate } from 'react-router-dom'
import styles from '../css/SlayerForm.module.css'
import { GiMagicSwirl, GiWolfHowl, GiPotionBall, GiSwordman, GiMantrap, GiFootsteps } from 'react-icons/gi'

export const SlayerRegisterView = () => {
    const DEFAULT_SLAYER_DATA = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        skills: [],
    }

    const SLAYER_SKILLS = [
        { name: 'Magic', icon: <GiMagicSwirl /> },
        { name: 'Beast Taming', icon: <GiWolfHowl /> },
        { name: 'Alchemy', icon: <GiPotionBall /> },
        { name: 'Weapons', icon: <GiSwordman /> },
        { name: 'Trap Setting', icon: <GiMantrap /> },
        { name: 'Tracking', icon: <GiFootsteps /> }
    ]

    const [newSlayer, setNewSlayer] = useState(DEFAULT_SLAYER_DATA)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const updateSlayer = (e) => {
        const { name, value } = e.target
        setNewSlayer(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerSlayer(newSlayer)
            .then(() => {
                setNewSlayer(DEFAULT_SLAYER_DATA)
                setErrors({})
                navigate('/slayer/dashboard')
            })
            .catch(errors => setErrors(errors))
    }


    const toggleSkill = (skillName) => {
        setNewSlayer(prev => {
            const alreadySelected = prev.skills.includes(skillName)

            const updatedSkills = alreadySelected
                ? prev.skills.filter(skill => skill !== skillName)
                : [...prev.skills, skillName]

            return { ...prev, skills: updatedSkills }
        })
    }

    return (
        //TODO: all css. make icons responsive
        <div className={styles.pagebackground}>
            <div className={styles.formContainer}>
                <h1 className={styles.header}>New Slayer Profile</h1>

                <form onSubmit={handleSubmit}>

                    <div className={styles.leftContainer}>
                        <div className={styles.formInput}>
                            <label>Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={newSlayer.name}
                                    onChange={updateSlayer}
                                />
                            </label>
                            {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
                        </div>

                        <div className={styles.formInput}>
                            <label>Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={newSlayer.email}
                                    onChange={updateSlayer}
                                />
                            </label>
                            {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                        </div>

                        <div className={styles.formInput}>
                            <label >Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={newSlayer.password}
                                    onChange={updateSlayer}
                                />
                            </label>
                            {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                        </div>

                        <div className={styles.formInput}>
                            <label>Confirm Password:
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={newSlayer.confirmPassword}
                                    onChange={updateSlayer}
                                />
                            </label>
                            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
                        </div>

                        <div className={styles.formInput}>
                            <label>Short Bio:
                                <textarea
                                    name="bio"
                                    value={newSlayer.bio}
                                    onChange={updateSlayer}
                                />
                            </label>
                            {errors.bio && <p className={styles.errorText}>{errors.bio.message}</p>}
                        </div>
                    </div>


                    <div className={styles.rightColumn}>
                        <h2>Hunting Skills</h2>
                        <div className={styles.skillContainer}>

                            {SLAYER_SKILLS.map(({ name, icon }) => (
                                <div
                                    key={name}
                                    onClick={() => toggleSkill(name)}
                                >
                                    <div className={styles.icon}>
                                        {icon}
                                    </div>
                                    <div className={styles.skillName}>
                                        {name}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {errors.skills && <p className={styles.errorText}>{errors.skills.message}</p>}
                    </div>

                    <button type='submit' className={styles.submitButton}>Begin Your Hunting</button>
                </form>
            </div>
        </div>
    )
}