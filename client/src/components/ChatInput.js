import { useState } from "react"

const ChatInput = () => {
    const [textarea, setTextArea] = useState('')
    return (
        <div className="chat-input">
            <textarea value={textarea} onChange={(ev) => setTextArea(ev.target.value)} />


            <button className="secondary-button">Submit</button>
        </div>
    )
}

export default ChatInput