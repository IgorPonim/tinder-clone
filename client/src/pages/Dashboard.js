
import axios from "axios"
import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie"

const Dashboard = () => {

    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const [genderedUsers, setGenderedUsers] = useState(null)

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            setUser(response.data)
        }
        catch (err) { console.log(err) }
    }

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data)
        } catch (err) { console.log(err) }
    }



    useEffect(() => {
        getUser()
        getGenderedUsers()
    }, [])
    useEffect(() => {
        getGenderedUsers()
    }, [user])

    // console.log(genderedUsers)



    const [lastDirection, setLastDirection] = useState()


    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put(`http://localhost:8000/addmatch`, {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) { console.log(err) }
    }

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }


    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')

    }



    const matchedUserIds = user?.matсhes.concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(
        genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )


    return (
        <>
            {user && genderedUsers &&
                <div className='dashboard'>
                    <ChatContainer user={user} />
                    <div className='swiper-container'>
                        <div className='card-container'>

                            {filteredGenderedUsers.map((character) =>
                                <TinderCard className='swipe' key={character._id} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
                                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                        <h3>{character.first_name}</h3>
                                    </div>
                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard