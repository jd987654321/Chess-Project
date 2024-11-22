import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import { WebSocketServer } from 'ws'
import { v4 } from 'uuid' 


const wss = new WebSocketServer({ port: 8080 }) 

//so i can pair websockets together if i put the objects in an object like an array or something
//websocket connection object -> ws1, ws2, connectionId
//now is the thing with websocket connections mixed with http requests
/**
 * first person to connect, will create a new ws1 connection with its own unique id, and a null ws2
 * 
 */

let Connections = {}

wss.on('connection', (ws) => {
    console.log('new client connected')
    let connectionId = v4()

    Connections[connectionId] = {
        ws1: ws,
        ws2: null
    }

    ws.send(connectionId)
    console.log(`   created ${connectionId}`)

    ws.on('message', (message) => {
        console.log(`message recieved: ${message}`)
        
    })

    ws.on('close', () => {
        console.log('client disconnected')
    })
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT

const logger = (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`)
    next()
}

app.use(express.static(path.join(__dirname, '/front')))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
