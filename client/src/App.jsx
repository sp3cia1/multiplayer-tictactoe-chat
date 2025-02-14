
import { useState, useCallback } from "react"
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

  const handleRoomIdChange = (newValue) => {
    // if(newValue === ""){
    //   setRoomId("")
    // } else{
      setRoomId(newValue)
    // }
  }

//   const handleDisconnect = useCallback(() => {
//     setRoomId("");
// }, []);

  return roomId ? (
      <Home roomId = {roomId} handleRoomIdChange={handleRoomIdChange}/>
  ) : (
    <Login handleRoomIdChange={handleRoomIdChange}/>
  )
}

export default App
