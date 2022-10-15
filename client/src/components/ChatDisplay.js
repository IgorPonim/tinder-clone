import axios from "axios"
import { useEffect, useState } from "react"
import Chat from "./Chat"
import ChatInput from "./ChatInput"

const ChatDisplay = ({ user, clickedUser }) => {

    const userId = user?.user_id

    const clickedUserId = clickedUser?.user_id

    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUserMessages, setClickedUserMessages] = useState(null)



    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            });
            setUsersMessages(response.data)
        }
        catch (err) { console.log(err) }
    }


    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            });
            setClickedUserMessages(response.data)
        }
        catch (err) { console.log(err) }
    }



    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [])



    const messages = []
    usersMessages?.forEach(element => {
        const formatedMessage = {}
        formatedMessage['name'] = user?.first_name
        formatedMessage['img'] = user?.url
        formatedMessage['message'] = element.message
        formatedMessage['timestamp'] = element?.timestamp
        messages.push(formatedMessage)
    });

    clickedUserMessages?.forEach(element => {
        const formatedMessage = {}
        formatedMessage['name'] = clickedUser?.first_name
        formatedMessage['img'] = clickedUser?.url
        formatedMessage['message'] = element.message
        formatedMessage['timestamp'] = element?.timestamp
        messages.push(formatedMessage)
    });
    const descendingOregerMessages = messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp))


    return (
        <>
            <Chat descendingOregerMessages={descendingOregerMessages} />
            <ChatInput user={user} clikedUser={clickedUser} getUsersMessages={getUsersMessages} getClickedusersMessages={getClickedUsersMessages} />
        </>
    )
}

export default ChatDisplay