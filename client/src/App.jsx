import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JoinButton from './JoinButton'
import PlayButton from './PlayButton'
import ChessGame from './ChessGame'
import { v4 } from 'uuid'
import useSocket from './useSocket'
import { Chess } from 'chess.js'

export default function App() {
  let [game, setGame] = useState(new Chess())
  let [gameId, setGameId] = useState(v4())
  let [startGame, setStartGame] = useState(false)
  let [validGameId, setValidGameId] = useState("")
  let [foundGame, setFoundGame] = useState(false)
  let [isConnected, setIsConnected] = useState(false)
  let [opponentMove, setOpponentMove] = useState(null)
  let [color, setColor] = useState("white")
  let [ws, setWs] = useState(useSocket("http://localhost:8080", setOpponentMove, setColor, game, setGame))
  

  useEffect(() => {
    if(startGame === true){
        ws.connect(gameId)
        console.log(gameId)
        setIsConnected(true)
        console.log(`Connection status: ${isConnected}`)
    }
  }, [startGame])

  return (
    <div className="background">
      {!startGame ? 
      (<>
      <h1>Chess</h1>
      <PlayButton id={gameId}/>
      <JoinButton 
      gameId={gameId}
      setGameId={setGameId}
      setStartGame={setStartGame}
      /*startConnection={startConnection}*//>
      </>) :
      <div>
        <ChessGame 
        setOpponentMove={setOpponentMove}
        opponentMove={opponentMove}
        setGame={setGame}
        game={game}
        ws={ws} 
        color={color} 
        isConnected={isConnected} 
        gameId={gameId}/>
      </div>
      }
    </div>
  )
}


