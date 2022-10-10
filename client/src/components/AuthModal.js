import { useState } from "react"

const AuthModal = ({ setShowModal, isSignUp }) => {



    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        setError(null)
        e.preventDefault()
        if (isSignUp && (password !== confirmPassword)) {
            setError('Пароль не совпадает')
        }
        else console.log('make a post request to our dataBase')
    }


    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)



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