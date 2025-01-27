// import { useState } from "react"
// import Cell from "./components/cell"
// import InfoBoard from "./components/InfoBoard"
import { useState } from "react"
import Home from "./Home"
import Login from "./components/Login"

function App() {
  const [roomId, setRoomId] = useState("")

  // const necessaryNums = [3,5,7] //every winning combination includes these numbers
  // const winningCombinations =[
  //   [3,5,7],[1,5,9],
  //   [1,2,3],[4,5,6],[7,8,9],
  //   [3,6,9],[2,5,8],[1,4,7]
  // ]

  // const [currentPlayer, setCurrentPlayer] = useState('p1')
  // const [gameFinished, setGameFinished] = useState(false)
  // const [p1Cells, setP1Cells] = useState([])
  // const [p2Cells, setP2Cells] = useState([])


  // function handleClick(id) {
  //   if (!gameFinished){
  //     if(currentPlayer == 'p1'){
  //       const updatedP1Cells = [...p1Cells,id];
  //       setP1Cells(updatedP1Cells)
  //       checkWin(updatedP1Cells)
  //       setCurrentPlayer('p2')
  //     } else {
  //       const updatedP2Cells = [...p2Cells,id];
  //       setP2Cells(updatedP2Cells)
  //       checkWin(updatedP2Cells)
  //       setCurrentPlayer('p1')
  //     }
  //   }
  // }

  // //helper function to check for winning combos
  // const hasWinningCombo = (playerMoves, winningCombos) => {
  //   return winningCombos.some(combo => combo.every(num => playerMoves.includes(num)));
  // };

  // function checkWin(playerCells){
  //   if(playerCells.length > 2 && playerCells.some(num => necessaryNums.includes(num)) ) {
  //     if(hasWinningCombo(playerCells, winningCombinations)){
  //       console.log(`${currentPlayer} WON, player moves ${playerCells}`)

  //       setGameFinished(prev => !prev)
  //     }
  //   }
  // }

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
