import React, { useState, useEffect, useRef } from 'react'

export default function ChatBox({messages, sendJsonMessage, player, handleChatOpen}) {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
    };
    useEffect(()=>{
        scrollToBottom();
    }, [messages])
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!msg.trim()) return;
        handleClick();
    };
    
    return (
        <div className='chat-box'>
            <div>
                <button onClick={handleChatOpen}>
                    <i className="ph ph-x"></i>
                </button>
            </div>
            <div>
                <ul>
                    {
                        messages.map((msg, msgId)=>(
                            <li key={msgId} className={(msg.sender == "player") ? 'player-text' : 'opponent-text'}>
                                {msg.text}
                            </li>
                        ))
                    }
                </ul>
                <div ref={messagesEndRef}></div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        value={msg} 
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder='Type a message...'
                    />
                    <button type="submit">
                        <i className="ph ph-paper-plane-tilt"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}
