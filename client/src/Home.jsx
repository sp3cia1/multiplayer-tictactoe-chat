import InfoBoard from "./components/InfoBoard"
import Cell from "./components/cell"

function Home({roomId}){
    console.log("roomId", roomId)
    const cells = [1,2,3,4,5,6,7,8,9]
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