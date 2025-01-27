function Cell(props){
    const { id,p1Cells,p2Cells,handleClick } = props;

    return(
        <div className="cell" 
            // onClick={() => handleClick(id)}
        >
            {/* {p1Cells.includes(id) ? "X" : p2Cells.includes(id) ? "O" : " " } */}
        </div>
    )
}

export default Cell;