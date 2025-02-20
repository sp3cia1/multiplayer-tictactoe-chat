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
    Object.keys(rooms[roomId].players).forEach(player => {
        const connection = rooms[roomId].players[player]
        const msg = JSON.stringify(playerMoves[roomId])
        connection.send(msg)
        console.log("sent message from server", msg)
    })
}

// message = {"1": [], "2":[]}
//or
// message = {"text":"Hello", "sender":1}
//or
//messsage = {"rematch":boolean, "sender":1}
const handleMessage = (bytes, roomId) => {
    const message = JSON.parse(bytes)
    if(!message.sender){
        console.log("Message received on server", message)
        console.log("Player Moves ", playerMoves)
        if(JSON.stringify(playerMoves[roomId]) === JSON.stringify(message)){
            return;
        }
        playerMoves[roomId] = message
        broadcast(roomId)
    } else{
        if(!message.text){ //if we dont have a text key field this means this is a rematch request message
            if(message.rematch){ // if rematch = true in messsage
                if(rooms[roomId].rematch){
                    console.log("working for true and when remactb is 1")
                    //clear player moves and restart game
                    playerMoves[roomId] = {
                        1:[],
                        2:[]
                    }
                    rooms[roomId].rematch = 0
                } else{
                    console.log("working for true and when remactb is 0")
                    rooms[roomId].rematch++;
                }
            } else{
                rooms[roomId].rematch = 0
            }
            console.log("message ", message)
            //send the rematch message to the other player apart from sender
            Object.keys(rooms[roomId].players).forEach(player => {
                if(player != message.sender){ //player is string and message.sender is number so we not doing strict comparison here 
                    const connection = rooms[roomId].players[player]
                    const msg = JSON.stringify(message)
                    connection.send(msg)
                }
            })
        } else{
            Object.keys(rooms[roomId].players).forEach(player => {
                const connection = rooms[roomId].players[player]
                const msg = JSON.stringify(message)
                connection.send(msg)
                console.log("sent message from server", msg)
            })
        }
        // console.log("received message ", message)
    }
}

const handleClose = (roomId) => {
    console.log("A player disconnected closing and deleting the room")
    const firstPlayer = Object.keys(playerMoves[roomId])[0]
    // Delete the first player's moves from the room
    delete playerMoves[roomId][firstPlayer]
    //everytime a player disconnects this code is called and we close both player connections so for the player who didnt close his connection the connection.on(close) function is called for him and this code is called again so if we deleted roomId from rooms here then when it tries to close from here again it wont find the connection to call the .close() function on and throw an error.
    Object.keys(rooms[roomId].players).forEach(player => {
        rooms[roomId].players[player].close()
    })
    // console.log(playerMoves)
    // console.log(Object.keys(playerMoves[roomId]).length)
    if(Object.keys(playerMoves[roomId]).length === 0){
        //we can safely remove the roomId from rooms and playerMoves db here as both player have disconnected and forEach has been called for both of them
        delete rooms[roomId]
        delete playerMoves[roomId]
        console.log("player moves after closing room", playerMoves)
        console.log(rooms)
    } 
}

//ws://localhost:8000?roomId=1234
wss.on('connection', (connection, request) =>{

    const { roomId } = url.parse(request.url, true).query

    if(rooms[roomId]){ //if this roomId already exists

        if(Object.keys(rooms[roomId].players).length < 2){
            //If there are less then 2 players
            rooms[roomId].players[2] = connection
            console.log('Another player connected')
            console.log("room after p2 coonected", rooms)
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
            "players":{1:connection},
            "rematch":0
        }
        console.log('Player 1 connected')
        console.log("room after p1 coonected", rooms)
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