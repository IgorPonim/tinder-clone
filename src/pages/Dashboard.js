
import { useState } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"

const Dashboard = () => {
    const db = [
        {
            name: 'Richard Hendricks',
            url: 'https://kartinkin.net/uploads/posts/2022-05/1652228300_1-kartinkin-net-p-nezhnii-kartinki-1.jpg'
        },
        {
            name: 'Erlich Bachman',
            url: 'https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg'
        },
        {
            name: 'Monica Hall',
            url: 'https://i.pinimg.com/236x/9d/fc/dc/9dfcdc098ba899f6b78b67ae2bad1929.jpg'
        },
        {
            name: 'Jared Dunn',
            url: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1472042660_10.jpg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://img3.akspic.ru/previews/7/4/2/8/6/168247/168247-kosti_3d-igra_v_kosti_3d-azartnaya_igra-pitevaya_igra-kazino-500x.jpg'
        }
    ]
    const characters = db
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
            <div className='dashboard'>
                <ChatContainer />
                <div className='swiper-container'>
                    <div className='card-container'>

                        {characters.map((character) =>
                            <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                    <h3>{character.name}</h3>
                                </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard