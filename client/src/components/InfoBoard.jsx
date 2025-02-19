export default function InfoBoard (props) {

    const { isMyTurn, gameOver, sendJsonMessage, player, restart, setRestart } = props;

    function handleRestartClick(){
        if(!restart){
            const message = {
                "rematch" : true,
                "sender" : player
            }
            setRestart(true)
            sendJsonMessage(message)
        }

    }

    return(
        <div className="info-board">

        {restart ? (
            "Rematch Requested, Waiting for Opponnet"
        ) : (
            <>
                {gameOver ? (
                    isMyTurn ? "Damn! You Lost" : "Yay! You Won"
                ) : (
                    isMyTurn ? "Your Turn" : (
                        <div>
                            <i className="ph ph-spinner-gap"></i>
                            <span>Waiting for Opponnet...</span>
                        </div>
                    )
                )}
                <button className="restart-button" onClick={handleRestartClick}>
                    Restart Game
                </button>
            </>
        )}
      
    </div>
    )
}