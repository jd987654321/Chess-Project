import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JoinButton from './JoinButton'
import PlayButton from './PlayButton'
import ChessGame from './ChessGame'
import { v4 } from 'uuid'

export default function App() {
  let [gameId, setGameId] = useState(v4())
  let [startGame, setStartGame] = useState(false)
  let [validGameId, setValidGameId] = useState("")
  let [foundGame, setFoundGame] = useState(false)

  

  return (
    <div className="background">
      <h1>Chess</h1>
      <PlayButton id={gameId}/>
      <JoinButton /*startConnection={startConnection}*//>
      {/* {startGame && <ChessGame />} */}
      <ChessGame gameId={gameId}/>
    </div>
  )
}


