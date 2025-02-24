export default function InfoBoard (props) {

    const { isMyTurn, gameOver, sendJsonMessage, player, restart, setRestart, receivedRequest, setReceivedRequest, handleRestart } = props;

    function handleRestartClick(choice){
        if(!restart){ //if restart is false tehn only you can send restart messages 
            let message
            if(choice){
                message = {
                    "rematch" : true,
                    "sender" : player
                }
                setRestart(true)
                if(receivedRequest){ //only restart for the second client here as for the client who requested restart handled in home.
                    handleRestart()
                }
            } else{
                message = {
                    "rematch" : false,
                    "sender" : player
                }
                setReceivedRequest(false)
            }
            sendJsonMessage(message)
            console.log("sent message ", message)
            console.log("restart ", restart)
        }

    }

    return(
        <div className="info-board">

        {receivedRequest ? (
            <>
            <div>
                <span>Restart Requested </span>
            </div>
            <button className="infoboard-button" onClick={() => handleRestartClick(true)}>
                Accept
            </button>
            <button className="infoboard-button" onClick={() => handleRestartClick(false)}>
                Reject
            </button>
            </>
        ) : (
            <>
                {restart ? (
                    "Rematch Requested, Waiting..."
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
                        <button className="infoboard-button" onClick={() => handleRestartClick(true)}>
                            Restart Game
                        </button>
                    </>
                )}
            </>
        )}

        
      
    </div>
    )
}