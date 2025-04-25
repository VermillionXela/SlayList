import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginGuild } from '../services/guild.service'
import styles from '../css/LoginForm.module.css'


export const GuildLoginView = () => {
    const DEFAULT_GUILD_DATA = {
        email: '',
        password: ''
    }

    const [guild, setGuild] = useState(DEFAULT_GUILD_DATA)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setGuild(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginGuild(guild)
            .then(res => {
                sessionStorage.setItem('guild_name', res.name)
                sessionStorage.setItem('guild_id', res._id)
                navigate('/guild/dashboard')
            })
            .catch(errors => setErrors(errors))
    }

    return (
        <div className={styles.pageBackground}>
            <div className={styles.form}>
                <h1 className={styles.heading}>Guild Login</h1>
                <form onSubmit={handleSubmit} >
                    <div className={styles.formInput}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={guild.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                    </div>

                    <div className={styles.formInput}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={guild.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                    </div>

                    <button type='submit' className={styles.button}>Enter</button>
                </form>
            </div>
        </div>
    )
}