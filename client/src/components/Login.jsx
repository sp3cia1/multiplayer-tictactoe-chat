import { useState } from "react"

function Login({onSubmit}){
    // const { roomId, setRoomId } = props
    //we cant directly set roomId here as in input when we are typing intially roomId will be empty but as soon as we write a single number setRoomId will be triggered and roomId will no longer be falsy and so Home component will be called.
    const [input, setInput] = useState("")
    const [error, setError] = useState("")

    console.log(input)

    function handleSubmit(e){
        e.preventDefault();
        if (/^\d{4}$/.test(input)) {
            setError("");
            onSubmit(input)
        } else {
            setError("Please enter a 4-digit number.");
        }
    }

    return(
        <div>
            <h1>Welcome</h1>
            <p>Please enter a 4 digit number to create or join a room.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={input}
                    placeholder="e.g 1234"
                    onChange={(e)=>setInput(e.target.value)} 
                />
                {error && <p>{error}</p>}
                <button type="submit">Play</button>
            </form>
        </div>
    )
}

export default Login