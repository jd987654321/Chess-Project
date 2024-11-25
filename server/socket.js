import { Server, Socket } from "socket.io";
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

let games = {}

app.get('/', (req, res) => {
    res.status(200).send("yuh")
})

//so whats gonna happen is theyre gonna be part of both rooms,
io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`)

    let { gameId, playerId } = socket.handshake.query
    let color;


    if(!(gameId in games)){
        console.log(`    player 1 has connected to room ${gameId}`)
        let rand = Math.round(Math.random())
        games[gameId] = {
            s1: socket,
            s2: {
                dummy: '5'
            },
            player1Id: playerId,
            player2Id: null,
            color1: rand ? "white" : "black",
            color2: !rand ? "white" : "black"
        }
        color = games[gameId].color1
        console.log(games[gameId].player1Id)
        console.log(playerId)
    }else if(playerId === games[gameId].player1Id){
        games[gameId].s1 = socket
        console.log('player 1 reconnected')
    }else if('dummy' in games[gameId].s2){
        console.log(`    player 2 has connected to room ${gameId}`)
        games[gameId].s2 = socket
        games[gameId].player2Id = playerId
        color = games[gameId].color2
        console.log(games[gameId].player1Id)
        console.log(playerId)
    }else if(playerId === games[gameId].player2Id){
        games[gameId].s2 = socket
        console.log('player 2 reconnected')
    }else{
        console.log(`    Game Room full`)
        socket.disconnect(true)
    }

    socket.emit('color', color)

    socket.on('move', (move) => {
        let opponent = socket === games[gameId].s1 ? games[gameId].s2 : games[gameId].s1;
        let player = socket === games[gameId].s1 ? "s1" : "s2";
        console.log(player)
        opponent.emit('opponentMove', move)
    })

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} has disconnected`)

    })
})

server.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`)
})