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
    const [p1Cells, setP1Cells] = useState([])
    const [p2Cells, setP2Cells] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [player, setPlayer] = useState(null) //1 or 2
    const [isMyTurn, setIsMyTurn] = useState(false)
    console.log("I am Player ", player)
    
    const WS_URL = "ws://localhost:8000"
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: {roomId}
    })

    function handleClick(id) {
        if (gameStarted && isMyTurn){
            if(player === 1){
                const updatedP1Cells = [...p1Cells,id];
                setP1Cells(updatedP1Cells)
                setIsMyTurn(false)
            } else{
                const updatedP2Cells = [...p2Cells,id];
                setP2Cells(updatedP2Cells)
                setIsMyTurn(false)
            }
        }
    }
    
    const figureOutTurn = (message) => {
        const players = Object.keys(message);

        if (players.length === 2) {
            setGameStarted(true);
        }
        
        if (!player) {
            const newPlayer = players.length === 1 ? 1 : 2;
            setPlayer(newPlayer);
            
            // when 2 players get connected for the first time
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

    const updateCells = (msg) => {
        if(gameStarted){
            console.log("Message length", msg[1].length)
            if(msg[1].length !== p1Cells.length){
                setP1Cells(msg[1])
            }
            if(msg[2].length !== p2Cells.length){
                setP2Cells(msg[2])
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

    useEffect(() => {
        console.log("I was triggered")
        if(gameStarted && player){
            const msg = {
                1:p1Cells,
                2:p2Cells
            }
            sendJsonMessage(msg)
            console.log("sending message", msg)
        }
    }, [p1Cells, p2Cells])

    //use Use effect
    useEffect(() => {
        if (lastJsonMessage !== null) {
            figureOutTurn(lastJsonMessage)
            updateCells(lastJsonMessage)
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
                    p1Cells = {p1Cells}
                    p2Cells = {p2Cells}
                    handleClick = {handleClick}
                    />
                ))
                }
            </div>
        </>
    )
}

export default Home