import { useState, useEffect } from "react";
import InfoBoard from "./components/InfoBoard"
import Cell from "./components/cell"
import ChatButton from "./components/ChatButton";
import ChatBox from "./components/ChatBox";
import useWebSocket from 'react-use-websocket';

function Home({roomId}){
    const cells = [1,2,3,4,5,6,7,8,9]
    const necessaryNums = [3,5,7] //every winning combination includes these numbers
    const winningCombinations =[
        [3,5,7],[1,5,9],
        [1,2,3],[4,5,6],[7,8,9],
        [3,6,9],[2,5,8],[1,4,7]
    ]
    const [p1Cells, setP1Cells] = useState([])
    const [p2Cells, setP2Cells] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [player, setPlayer] = useState(null) //1 or 2
    const [isMyTurn, setIsMyTurn] = useState(false)
    const [gameOver, setGameOver] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [messages, setMessages] = useState([
        // { text: "Hi", sender: "opponent" },
        // { text: "Hello", sender: "player" },
        // { text: "I'm good", sender: "opponent" },
        // { text: "How are you", sender: "player" }
      ]);
      
    // console.log("I am Player ", player)
    
    const WS_URL = "ws://localhost:8000"
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: {roomId}
    })

    function handleClick(id) {
        if (gameStarted && isMyTurn && !gameOver){
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
            if (!gameOver) { // Only start the game if it's not over
                setGameStarted(true);
            }
        }
        
        if (!player) {
            const newPlayer = players.length === 1 ? 1 : 2;
            setPlayer(newPlayer);
            
            // when 2 players get connected for the first time
            if (players.length === 2) {
                // Player 1 goes first
                setIsMyTurn(player === 1);
            }
        } else if (!gameOver) { // Only update turns if game is not over
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
        if(gameStarted && !gameOver){ // Don't update cells if game is over
            if(msg[1].length !== p1Cells.length){
                setP1Cells(msg[1])
            }
            if(msg[2].length !== p2Cells.length){
                setP2Cells(msg[2])
            }
        }
    }

    function handleTextMessage(message){
        setMessages([...messages, {
            "text":message.text,
            "sender" : (message.sender == player) ? "player" : "opponent"
        }])
    }

    function handleChatOpen(){
        setIsChatOpen(!isChatOpen)
    }

    //helper function to check for winning combos
    const hasWinningCombo = (playerMoves, winningCombos) => {
        return winningCombos.some(combo => combo.every(num => playerMoves.includes(num)));
    };

    function checkWin(playerCells){
        if(
            playerCells.length > 2 && 
            playerCells.some(num => necessaryNums.includes(num))
        ){
            if(hasWinningCombo(playerCells, winningCombinations)){
                setGameOver(true);
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        console.log('Game Status:', {
            player,
            gameStarted,
            isMyTurn,
            gameOver
        });
    }, [player, gameStarted, isMyTurn, gameOver]);

    useEffect(() => {
        if(gameStarted && player){
            const msg = {
                1:p1Cells,
                2:p2Cells
            }
            
            // First check for win condition before sending the message
            const hasWon = checkWin(p1Cells) || checkWin(p2Cells);
            
            // Always send the message to keep other player in sync
            sendJsonMessage(msg)
            
            // If there's a win, don't update any other states
            if (hasWon) {
                setGameStarted(false);
                return;
            }
        }
    }, [p1Cells, p2Cells])

    //use Use effect whenever a new message is received
    useEffect(() => {
        if (lastJsonMessage !== null) {
            if(lastJsonMessage.sender){
                handleTextMessage(lastJsonMessage)
            }else{
                updateCells(lastJsonMessage)
                figureOutTurn(lastJsonMessage)
            }
        }
    }, [lastJsonMessage]);
    
    return(
        <>
            <InfoBoard 
                isMyTurn = {isMyTurn}
                gameOver = {gameOver}
            />
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
            <div className='chat-wrapper'>
                {isChatOpen ? (
                    <ChatBox messages = {messages} sendJsonMessage={sendJsonMessage} player={player} handleChatOpen={handleChatOpen}/>
                ) : (
                    <ChatButton gameStarted={gameStarted} gameOver={gameOver} handleChatOpen={handleChatOpen}/>
                )}
            </div>

        </>
    )
}

export default Home