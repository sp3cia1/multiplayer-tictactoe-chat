import { useState, useEffect } from "react";
import InfoBoard from "./components/InfoBoard"
import Cell from "./components/cell"
import useWebSocket from 'react-use-websocket';

function Home({roomId}){
    const cells = [1,2,3,4,5,6,7,8,9]
    // const necessaryNums = [3,5,7] //every winning combination includes these numbers
    // const winningCombinations =[
    //     [3,5,7],[1,5,9],
    //     [1,2,3],[4,5,6],[7,8,9],
    //     [3,6,9],[2,5,8],[1,4,7]
    // ]
    // const [p1Cells, setP1Cells] = useState([])
    // const [p2Cells, setP2Cells] = useState([])
    // const [gameStarted, setGameStarted] = useState(false)

    const WS_URL = "ws://localhost:8000"
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: {roomId}
    })

    // if (lastJSONMessage){
    //     // handleLastJSONMessage(lastJSONMessage)
    //     console.log(lastJSONMessage)
    // } 
    // this is stupid, its outside any React hooks or lifecycle methods, so it would only run once when the component is created, not when messages are actually received.

    //use Use effect
    useEffect(() => {
        if (lastJsonMessage !== null) {
            console.log('Received message:', lastJsonMessage);
        }
    }, [lastJsonMessage]);
    
    return(
        <>
            <InfoBoard />
            <div className="board">
                {
                cells.map((id) => (
                    <Cell 
                    key = {id} 
                    id = {id} 
                    // p1Cells = {p1Cells}
                    // p2Cells = {p2Cells}
                    // handleClick = {handleClick}
                    />
                ))
                }
            </div>
        </>
    )
}

export default Home