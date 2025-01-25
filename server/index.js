const http = require('http');
const { WebSocketServer } = require('ws')
const url = require('url')

const server = http.createServer();
const wss = new WebSocketServer({server})

const PORT = 8000

const rooms = { }
const playerMoves= { }

//ws://localhost:8000?roomId=1234
wss.on('connection', (connection, request) =>{
    const { roomId } = url.parse(request.url, true).query
    if(rooms[roomId]){
        if(rooms[roomId] < 2){
            rooms[roomId] +=1
            console.log('Player 2 connected')
            console.log(rooms)
            console.log(playerMoves)
        }
        else{
            console.log(`Room ${roomId} is full`)
            connection.close()
        }
    } else{
        rooms[roomId] = 1
        console.log('Player 1 connected')
        playerMoves[roomId] = {
            1:[],
            2:[]
        }
    }
})

server.listen(PORT, () => {
    console.log(`websocket server is running on port ${PORT}`)
})