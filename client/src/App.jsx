
import { useState, useCallback } from "react"
import Home from "./Home"
import Login from "./components/Login"

function App() {
  const [roomId, setRoomId] = useState("")

  const handleRoomIdChange = (newValue) => {
      setRoomId(newValue)
  }

  return <>
    <header className="game-header" onClick={()=>{handleRoomIdChange("")}}>TicTacToe</header>
    {roomId ? (
        <Home roomId = {roomId} handleRoomIdChange={handleRoomIdChange}/>
    ) : (
      <Login handleRoomIdChange={handleRoomIdChange}/>
    )}
  </>
}

export default App
