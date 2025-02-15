import React, {useEffect, useState, useRef} from 'react'

function InfoBox({handleRoomIdChange}) {
    const [timer, setTime] = useState(3);
    const intervalId = useRef(null);

    useEffect(() => {
        if(timer > 0){
            intervalId.current = setInterval(()=>{
                setTime((prevTime) => {
                    return prevTime - 1;
                })
            }, 1000)
        } else{
            console.log('Cleaning up WebSocket connection');
            handleRoomIdChange("")
        }

        return () => clearInterval(intervalId.current);
        
    }, [handleRoomIdChange, timer]);

  return (
    
    <div className='overlay'>
        <div className="disconnect-message">
            <h3>Opponent disconnected</h3>
            <p>Returning to lobby in {timer} seconds...</p>
        </div>
    </div>
  )
}

export default InfoBox;
