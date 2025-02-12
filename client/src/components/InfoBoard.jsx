export default function InfoBoard (props) {

    const { isMyTurn, gameOver } = props;

    return(
        <div className="info-board">

        {gameOver ? 
            (isMyTurn ? "Damn! You Lost" : "Yay! You Won") : //after receiving the moves the client first updates turn before checking for win or loss thats why if its not your turn you won.
            (isMyTurn ? "Your Turn" : 
                <div>
                    <i className="ph ph-spinner-gap"></i>
                    <span>Waiting for Opponnet...</span>
                </div>
            ) 
        }

      <button className="restart-button" >Restart Game</button>
      
    </div>
    )
}