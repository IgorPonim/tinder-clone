import { useState } from "react"
import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal"

const Home = () => {
    const [showModal, setShowModal] = useState(false)

    const authToken = false

    const handleClick = () => {
        setShowModal(true)
        setIsSignedUp(true)
    }

    const [isSignedUp, setIsSignedUp] = useState(true)

    return (
        <>
            <div className="overlay">
                <Nav minimal={false}
                    authToken={false}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    setIsSignedUp={setIsSignedUp}
                />
                <div className="home">
                    <h1 className="primary-title" >Swipe Right&#174;</h1>
                    <button onClick={handleClick} className="primary-button">
                        {authToken ? 'Signout' : 'Creacte Account'}
                    </button>

                    {showModal && (
                        <AuthModal setShowModal={setShowModal} isSignUp={isSignedUp} />
                    )}

                </div>
            </div>
        </>
    )
}

export default Home