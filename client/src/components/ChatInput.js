import axios from "axios"
import { useState } from "react"

const ChatInput = ({ user, clikedUser, getUsersMessages, getClickedusersMessages }) => {
    const [textArea, setTextArea] = useState(null)

    const userId = user?.user_id
    const clickedUserId = clikedUser?.user_id


    const addmessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea,
        }

        try {
            await axios.post('http://localhost:8000/messages', {
                message
            })
            getClickedusersMessages()
            getUsersMessages()
            setTextArea('')
        } catch (err) {
            console.log(err)
        }
    }
    const enterClick = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault();
            addmessage()
        }
    }




    return (
        <div className="chat-input">
            <textarea onKeyDown={enterClick} value={textArea} onChange={(ev) => setTextArea(ev.target.value)} />


            <button className="secondary-button" onClick={addmessage}>Submit</button>
        </div>
    )
}

export default ChatInput