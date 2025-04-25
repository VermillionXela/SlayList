import React, { useState } from 'react'
import { registerGuild } from '../services/guild.service'
import { useNavigate } from 'react-router-dom'
import styles from '../css/GuildForm.module.css'

export const GuildRegisterView = () => {
    const DEFAULT_GUILD_DATA = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [newGuild, setNewGuild] = useState(DEFAULT_GUILD_DATA)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const updateGuild = (e) => {
        const { name, value } = e.target
        setNewGuild(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerGuild(newGuild)
            .then(() => {
                setNewGuild(DEFAULT_GUILD_DATA)
                setErrors({})
                navigate('/guild/dashboard')
            })
            .catch(errors => setErrors(errors))
    }

    return (
        <div className={styles.pageBackground}>
            <div className={styles.formContainer}>
            <h1 className={styles.heading}>New Guild Registration</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formInput}>
                    <label>Guild Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newGuild.name}
                        onChange={updateGuild}
                    />
                    {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
                </div>

                <div className={styles.formInput}>
                    <label>Email:</label>
                    <input
                        type='email'
                        name="email"
                        value={newGuild.email}
                        onChange={updateGuild}
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                </div>

                <div className={styles.formInput}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={newGuild.password}
                        onChange={updateGuild}
                    />
                    {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                </div>

                <div className={styles.formInput}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={newGuild.confirmPassword}
                        onChange={updateGuild}
                    />
                    {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className={styles.submitButton}>Onwards!</button>
            </form>
        </div>
        </div>
    )
}