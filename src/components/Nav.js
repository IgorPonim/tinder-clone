import colorLogo from '../images/tinder-wordmark-1.svg'
import whiteLogo from '../images/cut.png'
const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignedUp }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignedUp(false)
    }

    return (
        <>
            <nav>
                <div className="logo-container">
                    <img className="logo" src={minimal ? colorLogo : whiteLogo} />
                </div>
                {!authToken && !minimal && <button className='nav-button'
                    onClick={handleClick}
                    disabled={showModal}
                >Log in</button>}
            </nav>
        </>
    )
}

export default Nav