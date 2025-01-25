export default function InfoBoard (props) {

    const { gameFinished, currentPlayer, handleRestart } = props;

    return(
        <div className="info-board">

        {gameFinished ? 
            ("GAME OVER. Player " + (currentPlayer === 'p2' ? "1 " : "2 " ) + "Won") : ("Player " + (currentPlayer === 'p1' ? "1's " : "2's ") + "Turn") 
        }
      <button className="restart-button" onClick={() => handleRestart()}>Restart Game</button>
    </div>
    )
}