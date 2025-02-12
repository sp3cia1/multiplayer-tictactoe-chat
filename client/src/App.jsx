
import { useState } from "react"
import Home from "./Home"
import Login from "./components/Login"

function App() {
  const [roomId, setRoomId] = useState("")

  // function handleRestart(){
  //   setP1Cells([])
  //   setP2Cells([])
  //   setCurrentPlayer('p1')
  //   setGameFinished(false)
  // }

  return roomId ? (
      <Home roomId = {roomId}/>
  ) : (
    <Login onSubmit = {setRoomId}/>
  )
}

export default App
