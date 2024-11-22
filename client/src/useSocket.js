import { io } from 'socket.io-client'

export default function useSocket(url, gameId){
    let socket;

    function connect(){
        socket = io("http://localhost:8080", {
            query: {
                gameId: gameId
            }
        })

        socket.on("welcome", (message) => {
            console.log("Connected")
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
        socket.disconnect()
        console.log("socket disconnected")
    }

    return {
        connect, sendMsg, sendMove, disconnect
    }
}