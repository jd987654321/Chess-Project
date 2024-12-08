import { useState, useEffect } from 'react'
import './App.css'
import Popup from './Popup'
import JoinButton from './JoinButton'
import PlayButton from './PlayButton'
import ChessGame from './ChessGame'
import { v4 } from 'uuid'
import useSocket from './useSocket'
import { Chess } from 'chess.js'

export default function App() {
  let [game, setGame] = useState(new Chess())
  let [gameId, setGameId] = useState("")
  let [playerId, setPlayerId] = useState(v4())
  let [playerTurn, setPlayerTurn] = useState("white")
  let [startGame, setStartGame] = useState(false)
  let [validGameId, setValidGameId] = useState("")
  let [foundGame, setFoundGame] = useState(false)
  let [isConnected, setIsConnected] = useState(false)
  let [opponentMove, setOpponentMove] = useState(null)
  let [color, setColor] = useState("white")
  let [ws, setWs] = useState(useSocket("http://localhost:8080", setOpponentMove, setColor, game, setIsConnected, playerId))
  
  useEffect(() => {
    if(sessionStorage.getItem('playerId') !== null){
      console.log("Id has already been set")

      return
    }
    sessionStorage.setItem('playerId', v4())
    console.log("Id has been set")
  }, [])

  useEffect(() => {
    if(startGame){
        ws.connect(gameId)
        console.log(gameId)
        console.log(`Connection status: ${isConnected}`)
        return
    }else if(isConnected && !startGame){
      ws.disconnect()
      setIsConnected(false)
    }
  }, [startGame])

  const ChessGameProps = {
    setOpponentMove: setOpponentMove,
    opponentMove: opponentMove,
    setGame: setGame,
    game: game,
    ws: ws,
    color: color,
    isConnected: isConnected,
    gameId: gameId
  }

  return (
    <div className="background">
      <Popup options={['yes', 'no']} message={"test"}/>
      {!startGame ? 
      (<>
        <h1>Chess</h1>
        <PlayButton id={gameId}/>
        <JoinButton 
        gameId={gameId}
        setGameId={setGameId}
        setStartGame={setStartGame}/>
      </>) :
      <div>
        <ChessGame {...ChessGameProps}/>
        <button onClick={() => {setStartGame(false)}}>Back</button>
        {isConnected && <div className="option-buttons-container">
          <button onClick={() => {}}>Surrender</button>
          <button onClick={() => {}}>Offer Draw</button>
        </div>}
      </div>
      }
    </div>
  )
}


