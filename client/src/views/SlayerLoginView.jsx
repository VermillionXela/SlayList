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
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setSlayer(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        loginSlayer(slayer)
            .then(res => {
                sessionStorage.setItem('slayer_name', res.name)
                sessionStorage.setItem('slayer_id', res._id)
                navigate('/slayer/dashboard')
            })
            .catch(errors => setErrors(errors))
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
                        {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                    </div>

                    <div className={styles.formInput}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={slayer.password}
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