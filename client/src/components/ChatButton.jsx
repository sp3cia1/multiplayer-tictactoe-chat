import React from 'react'

export default function ChatButton({gameStarted, gameOver}) {
  return (
    <div className='chat-wrapper'>
      {(gameStarted || gameOver) ? (
        <button className='chat-button'>
          <i className="ph ph-chats"></i>
          <span>Chat</span>
        </button>
      ) : (
        <div className='chat-waiting'>
          <i className="ph ph-hourglass-medium"></i>
          <span>Waiting for player...</span>
        </div>
      )}
    </div>
  )
}
