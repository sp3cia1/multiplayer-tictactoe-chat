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
    const [gameStarted, setGameStarted] = useState(false)
    const [player, setPlayer] = useState(null) //1 or 2
    const [isMyTurn, setIsMyTurn] = useState(false)
    console.log("I am Player ", player)
    
    const WS_URL = "ws://localhost:8000"
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: {roomId}
    })
    
    const figureOutTurn = (message) => {
        const players = Object.keys(message);

        if (players.length === 2) {
            setGameStarted(true);
        }
        
        if (!player) {
            const newPlayer = players.length === 1 ? 1 : 2;
            setPlayer(newPlayer);
            
            // If two players are present, set game started and determine first turn
            if (players.length === 2) {
                // Player 1 goes first
                setIsMyTurn(player === 1);
            }
        } else {
            // Game is already started and we have both players
            if (players.length === 2) {
                const moves = message;
                const player1Moves = moves['1'].length;
                const player2Moves = moves['2'].length;
                
                if (player1Moves === player2Moves) {
                    setIsMyTurn(player === 1);
                } else {
                    setIsMyTurn(player === 2);
                }
            }
        }
    }

    useEffect(() => {
        console.log('Game Status:', {
            player,
            gameStarted,
            isMyTurn
        });
    }, [player, gameStarted, isMyTurn]);

    //use Use effect
    useEffect(() => {
        if (lastJsonMessage !== null) {
            figureOutTurn(lastJsonMessage)
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