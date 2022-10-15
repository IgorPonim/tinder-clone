const Chat = ({ descendingOregerMessages }) => {

    
    return (
        <>
            <div className="chat-display">
                {descendingOregerMessages.map((message, _index) => {
                    return <div key={_index} >
                        <div className="chat-message-header">
                            <div className="img-container">
                                <img className="img-container-image"src={message.img} alt={message.first_name}></img>
                            </div>
                            <p>{message.name}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
                })}
            </div>
        </>
    )
}

export default Chat