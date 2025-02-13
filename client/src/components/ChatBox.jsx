import React, { useState } from 'react'

export default function ChatBox({messages, sendJsonMessage, player}) {
    console.log("message", messages);

    const [msg, setMsg] = useState("")
    if (typeof sendJsonMessage !== 'function') {
        console.warn('WebSocket connection not ready');
        return;
    }
    function handleClick(){
        const message = {
            "text" : msg,
            "sender" : player
        } 
        sendJsonMessage(message)
        console.log("sendJsonMessage called")
        setMsg("")
    }

    return (
        <div className='chat-box'>
            <ul>
                {
                    messages.map((msg, msgId)=>(
                        <li key={msgId} className={(msg.sender == "player") ? 'player-text' : 'opponent-text'}>
                            {msg.text}
                        </li>
                    ))
                }
            </ul>
            <div>
                <input value={msg} onChange={(e) => setMsg(e.target.value)}/>
                <button onClick={handleClick}><i className="ph ph-paper-plane-tilt"></i></button>
            </div>
        </div>
    )
}
