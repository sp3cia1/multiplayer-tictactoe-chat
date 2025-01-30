export default function InfoBoard (props) {

    const { isMyTurn, gameOver } = props;

    return(
        <div className="info-board">

        {gameOver ? 
            (isMyTurn ? "Damn! You Lost" : "Yay! You Won") :
            (isMyTurn ? "Your Turn" : "Waiting for Opponent...") 
        }

      <button className="restart-button" >Restart Game</button>
      
    </div>
    )
}