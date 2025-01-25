const http = require('http');
const { WebSocketServer } = require('ws')
const url = require('url')

const server = http.createServer();
const wss = new WebSocketServer({server})

const PORT = 8000

const rooms = { }
//{roomId:{1:connection,2:connection}, roomId:{1:connection,2:connection}}
const playerMoves= { }
//{roomId:{1:[],2:[]}, roomId:{1:[],2:[]}}

function broadcast(roomId){
    Object.keys(rooms[roomId]).forEach(player => {
        const connection = rooms[roomId][player]
        const msg = JSON.stringify(playerMoves)
        connection.send(msg)
    })
}

// message = {"1": [], "2":[]}
const handleMessage = (bytes, roomId) => {
    const message = JSON.parse(bytes)
    playerMoves[roomId] = message
    broadcast(roomId)
}

// const handleClose = (roomId,player) => {
//     console.log(`Player ${player} disconnected. Closing ${roomId}`)
//     console.log(player)
//     // console.log(rooms)
//     Object.keys(rooms[roomId]).forEach(player => {
//         const connection = rooms[roomId][player]
//         console.log(`closing and deleting ${player}`)
//         delete rooms[roomId][player]
//         // console.log(rooms)
//         connection.close()
//     })

//     if(Object.keys(rooms[roomId]).length === 0){
//         console.log(rooms)
//         console.log(playerMoves)
//         delete rooms[roomId]
//         delete playerMoves[roomId]
//     }
// }

//ws://localhost:8000?roomId=1234
wss.on('connection', (connection, request) =>{

    const { roomId } = url.parse(request.url, true).query
    let player

    if(rooms[roomId]){ //if this roomId already exists

        if(Object.keys(rooms[roomId]).length < 2){
            //If there are less then 2 players
            rooms[roomId][2] = connection
            player = 2
            console.log('Player 2 connected')
            // console.log(rooms)
            console.log(playerMoves)
        }
        else{
            console.log(`Room ${roomId} is full`)
            connection.close()
        }
    } else{
        rooms[roomId]={
            1:connection
        }
        player = 1
        console.log('Player 1 connected')
        // console.log(rooms)
        // console.log(Object.keys(rooms[roomId]).length)
        playerMoves[roomId] = {
            1:[],
            2:[]
        }
    }

    connection.on("message", message => handleMessage(message, roomId))

    connection.on("close", ()=> {
        handleClose(roomId, player)
    })
    // i have to hanlde the case where the player 1 leaves, what to do? shift player 2 or add the newly connected player as player 1.

})


server.listen(PORT, () => {
    console.log(`websocket server is running on port ${PORT}`)
})