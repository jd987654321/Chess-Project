import { Server } from "socket.io";
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

    let { gameId } = socket.handshake.query

    if(!(gameId in games)){
        console.log(`    player 1 has connected to room ${gameId}`)
        let rand = Math.round(Math.random())
        games[gameId] = {
            s1: socket,
            s2: null,
            color1: rand ? "white" : "black",
            color2: !rand ? "white" : "black"
        }
    }else if(!games[gameId].s2){
        console.log(`    player 2 has connected to room ${gameId}`)
        games[gameId].s2 = socket
    }else{
        console.log(`    Game Room full`)
        socket.disconnect(true)
    }
})

server.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`)
})