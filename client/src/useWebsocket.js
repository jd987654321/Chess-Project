export default function useWebsocket(url ,gameId, setOpponentMove){
    let ws;

    function connect(){
        if(!ws){
            console.log("!ws")
            try{
                ws = new WebSocket(url + '/' + gameId)
            }catch(err){
                console.log("Websocket failed to connect")
                return false
            }
            

            ws.onopen = () => {
                console.log("Websocket connected")
            }

            ws.onmessage = (event) => {
                console.log("Message: ", event.data)
            }

            ws.onclose = () => {
                console.log("WebSocket closed")
            }

            ws.onerror = (error) => {
                console.error("WebSocket error: ", error)
            }
        }else{
            console.log(" has ws")
            console.log("WebSocket is already connected")
        }
        return true
    }

    function sendMsg(msg){
        console.log("trying to send msg" + ws)
        if(ws){
            console.log("msg sent")
            ws.send(msg)
        }else{
            console.error("Websocket is not open. Cannot send message")
        }
    }

    function close(){
        if(ws){
            ws.close()
        }
    }


    return {
        connect,
        sendMsg,
        close
    }
}