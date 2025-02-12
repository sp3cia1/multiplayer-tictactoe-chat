import React from 'react'

export default function ChatBox({messages}) {

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
            <input/>
            <button><i className="ph ph-paper-plane-tilt"></i></button>
        </div>
    </div>
  )
}
