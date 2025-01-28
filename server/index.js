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
        const msg = JSON.stringify(playerMoves[roomId])
        connection.send(msg)
    })
}

// message = {"1": [], "2":[]}
const handleMessage = (bytes, roomId) => {
    const message = JSON.parse(bytes)
    playerMoves[roomId] = message
    broadcast(roomId)
}

const handleClose = (roomId) => {
    console.log("A player disconnected closing and deleting the room")
    const firstPlayer = Object.keys(playerMoves[roomId])[0]
    // Delete the first player's moves from the room
    delete playerMoves[roomId][firstPlayer]
    //everytime a player disconnects this code is called and we close both player connections so for the player who didnt close his connection the connection.on(close) function is called for him and this code is called again so if we deleted roomId from rooms here then when it tries to close from here again it wont find the connection to call the .close() function on and throw an error.
    Object.keys(rooms[roomId]).forEach(player => {
        rooms[roomId][player].close()
    })
    // console.log(playerMoves)
    // console.log(Object.keys(playerMoves[roomId]).length)
    if(Object.keys(playerMoves[roomId]).length === 0){
        //we can safely remove the roomId from rooms and playerMoves db here as both player have disconnected and forEach has been called for both of them
        delete rooms[roomId]
        delete playerMoves[roomId]
        console.log(playerMoves)
        console.log(rooms)
    } 
}

//ws://localhost:8000?roomId=1234
wss.on('connection', (connection, request) =>{

    const { roomId } = url.parse(request.url, true).query
    let player

    if(rooms[roomId]){ //if this roomId already exists

        if(Object.keys(rooms[roomId]).length < 2){
            //If there are less then 2 players
            rooms[roomId][2] = connection
            console.log('Another player connected')
            playerMoves[roomId] = {
                1:[],
                2:[]
            }
            broadcast(roomId)
            //when i receive the playermoves with length == 2 for the first time i will set game start state to true.
            //and if i receive the playerMoves with length == 1 i will set it to false.
            // console.log(rooms)
            // console.log(playerMoves)
        }
        else{
            console.log(`Room ${roomId} is full`)
            connection.close()
        }
    } else{
        rooms[roomId]={
            1:connection,
        }
        console.log('Player 1 connected')
        // console.log(rooms)
        // console.log(Object.keys(rooms[roomId]).length)
        playerMoves[roomId] = {
            1:[],
        }
        broadcast(roomId)
        // console.log(rooms)
        //broadcast playerMoves if theres only one in player moves that means in frontend clinet is player 1 and they will be waiting for player 2
    }

    connection.on("message", message => handleMessage(message, roomId))

    connection.on("close", ()=> {
        handleClose(roomId)
    })
    //currently closing all conncetion and removing roomId from rooms and playerMoves when one of the player disconnects.
})


server.listen(PORT, () => {
    console.log(`websocket server is running on port ${PORT}`)
})