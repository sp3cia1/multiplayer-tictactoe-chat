import { useState, useEffect } from "react";

function ServerWarmup({ roomId, onServerReady, onCancel }) {
  const [status, setStatus] = useState("Connecting to game server...");
  const [countdown, setCountdown] = useState(30);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  
  useEffect(() => {
    let testSocket;
    let intervalId;
    let countdownId;
    
    
    const attemptConnection = () => {
      if (testSocket) {
        testSocket.close(); //This is a temporary "ping" connection just to check if the server is awake, we delete it to prevent having two connections.
      }
      
      setConnectionAttempts(prev => prev + 1);
      setStatus("Waking up the game server...");
      
      testSocket = new WebSocket(`wss://multiplayer-tictactoe-chat.onrender.com?roomId=test-${roomId}`); //using the native webSocket Api because we just want to ping it here not mange its lifecycle
      
      testSocket.onopen = () => { //this event fire when the connection is sucssesfully established
        setStatus("Server is ready! Joining game room...");
        testSocket.close();
        clearInterval(intervalId);
        clearInterval(countdownId);
        onServerReady();
      };
      
      testSocket.onerror = () => {
        setStatus("Server is still waking up. This may take up to 30 seconds...");
      };
    };
    
    // Start first connection attempt when we receive the roomId from login
    attemptConnection();
    
    // Try reconnecting every 5 seconds
    intervalId = setInterval(() => {
      attemptConnection();
    }, 5000);
    
    // Countdown timer to count to 30
    countdownId = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          clearInterval(countdownId);
          onServerReady(); // Proceed anyway after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup
    return () => {
      if (testSocket) testSocket.close();
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [roomId, onServerReady]);
  
  return (
    <div className="server-warmup-overlay">
      <div className="server-warmup-container">
        <h2>{status}</h2>
        <p>The game server is starting up because it uses a free tier that goes to sleep when not in use.</p>
        <div className="server-warmup-spinner"></div>
        <p>Connection attempts: {connectionAttempts}</p>
        <p>Proceeding in {countdown} seconds...</p>
        {onCancel && (
          <button className="server-warmup-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ServerWarmup;