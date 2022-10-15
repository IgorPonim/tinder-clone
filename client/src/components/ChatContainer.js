import { useState } from "react"
import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import MatchesDisplay from "./MathesDisplay"

const ChatContainer = ({ user }) => {

    const [clickedUser, setClickedUser] = useState(<></>)


    return (
        <>
            <div className="chat-container">
                <ChatHeader user={user} />

                <div>
                    <button className="option" onClick={() => setClickedUser(null)} >Matches</button>
                    <button className="option" disabled={!clickedUser}>Chat</button>
                </div>

                {!clickedUser && <MatchesDisplay setClickedUser={setClickedUser} matсhes={user.matсhes} />}
                {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
            </div>
        </>
    )
}

export default ChatContainer