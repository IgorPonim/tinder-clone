import { useState } from "react"
import axios from 'axios'
import { useHistory, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
const AuthModal = ({ setShowModal, isSignUp }) => {


    const history = useHistory()
    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        setError(null)
        e.preventDefault()
        if (isSignUp && (password !== confirmPassword)) {
            setError('Пароль не совпадает')
            return
        }
        else {

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('Email', response.data.email)
            setCookie('UserId', response.data.user_id)
            setCookie('Auth-token', response.data.token)
            const success = response.status == 201

            if (success && isSignUp) history.push('/onboarding')
            if (success && !isSignUp) history.push('/dashboard')

        }
    }


    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])


    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick} >&#10008;</div>

            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking submit you agree to the Terms and Conditions.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder="E-mail"
                    required={true}
                    onChange={(ev) => setEmail(ev.target.value)}

                />

                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder="password"
                    required={true}
                    onChange={(ev) => setPassword(ev.target.value)}

                />
                {isSignUp && <input
                    type='password'
                    id='password-check'
                    name='password-check'
                    placeholder="confirm password"
                    required={true}
                    onChange={(ev) => setConfirmPassword(ev.target.value)}

                />}
                <p>{error}</p>
                <input className="secondary-button" type='submit'></input>

            </form>

            <hr></hr>
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal