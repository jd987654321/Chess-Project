import { io } from 'socket.io-client'
import { Chess } from 'chess.js'

export default function useSocket(url, setOpponentMove, setColor, game ,setIsConnected, playerId){
    let socket;


    function connect(gameId){
        try{
            socket = io("http://localhost:8080", {
                query: {
                    gameId: gameId,
                    playerId, playerId
                },
                reconnection: true,
                reconnectionAttempts: 5
            })
        }catch(err){
            console.log("failed to connects")
        }

        socket.on('connect', () => {
            console.log('socket connected')
            setIsConnected(true)
        })

        socket.on('disconnect', () => {
            console.log('socket disconnected')
            setIsConnected(false)
        })
        
        socket.on('color', (color) => {
            setColor(color)
        })

        socket.on("welcome", (message) => {
            console.log("Connected")
        })

        socket.on('opponentMove', (move) => {
            console.log('move recieved')
            console.log(`move from opponent`)
            console.log(move)
            setOpponentMove(move)
        })

        return true
    }

    function sendMsg(msg){
        if(socket){
            socket.emit("message", `Message: ${msg}`)
            console.log("msg sent")
        }else{
            console.error("msg could not be sent")
        }
    }

    function sendMove(move){
        if(socket){
            socket.emit("move", move)
        }else{
            console.error("move could not be sent")
        }
    }

    function disconnect(){
        if(socket){
            socket.disconnect()
            console.log("socket disconnected")
        }
    }

    return {
        connect, sendMsg, sendMove, disconnect
    }
}