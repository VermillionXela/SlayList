import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginSlayer } from '../services/slayer.service'
import styles from '../css/LoginForm.module.css'


export const SlayerLoginView = () => {
    const DEFAULT_SLAYER_DATA = {
        email: '',
        password: ''
    }

    const [slayer, setSlayer] = useState(DEFAULT_SLAYER_DATA)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setSlayer(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        loginSlayer(slayer)
            .then(res => {
                const slayerData = res
                sessionStorage.setItem('slayer_name', slayerData.name)
                sessionStorage.setItem('slayer_id', slayerData._id)
                //sessionStorage.setItem('slayer_skills', JSON.stringify(slayerData.skills))
                navigate('/slayer/dashboard')
            })
            .catch(error =>
                {console.log('this is a message!')
                setError(error)})
    }


    return (
        <div className={styles.pageBackground}>
            <div className={styles.form}>
                <h1 className={styles.heading}>Slayer Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={slayer.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formInput}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={slayer.password}
                            onChange={handleChange}
                        />
                    </div>
                        {error && <p className={styles.errorText}>{error}</p>}

                    <button type='submit' className={styles.button}>Enter</button>
                </form>
            </div>
        </div>
    )
}