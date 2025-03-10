import { useState } from "react"
import ServerWarmup from "./ServerWarmup";

function Login({handleRoomIdChange}){
    // const { roomId, setRoomId } = props
    //we cant directly set roomId here as in input when we are typing intially roomId will be empty but as soon as we write a single number setRoomId will be triggered and roomId will no longer be falsy and so Home component will be called.
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [isWarmingUp, setIsWarmingUp] = useState(false);
    const [pendingRoomId, setPendingRoomId] = useState("");


    function handleSubmit(e){
        e.preventDefault();
        if (/^\d{4}$/.test(input)) {
            setError("");
            // Instead of immediately changing room, start warm-up process
            setPendingRoomId(input);
            setIsWarmingUp(true);
        } else {
            setError("Please enter a 4-digit number.");
        }
    }

    function handleServerReady() {
        // Only change room ID after server is ready
        handleRoomIdChange(pendingRoomId);
    }

    function handleCancel() {
        setIsWarmingUp(false);
        setPendingRoomId("");
    }

    return(
        <div className="login-container">
            {isWarmingUp && (
                <ServerWarmup 
                    roomId={pendingRoomId}
                    onServerReady={handleServerReady}
                    onCancel={handleCancel}
                />
            )}
            
            <h1>Welcome</h1>
            <p>Create or Join a Room.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={input}
                    placeholder="e.g 1234"
                    onChange={(e)=>setInput(e.target.value)} 
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Play</button>
            </form>
        </div>
    )
}

export default Login