import { useState, useEffect, useRef } from 'react'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useWebsocket from './useWebsocket';
import useSocket from './useSocket';

import './ChessGame.css'

export default function ChessGame(props){
    let { opponentMove, setOpponentMove, game, setGame, color, isConnected, setIsConnected, ws, setWs } = props
    const [hasInitialized, setHasInitialized] = useState(false); // Tracks if the component has completed the initial renders

    useEffect(() => {
      if(opponentMove === null){
        return
      }
        console.log('Opponent move recieved')
        const gameCopy = new Chess(game.fen())
        console.log(gameCopy.moves())
        //console.log(opponentMove)
        gameCopy.move(opponentMove)
        setGame(gameCopy)
    }, [opponentMove])
    
    //let [isConnected, setIsConnected] = useState(false)
    
    //let [ws, setWs] = useState(useSocket("http://localhost:8080", gameId))
    //console.log('rendered')
    
    // const startConnection = () => {
    //     let connectionResult = ws.connect()
    //     setIsConnected(connectionResult)
    // }

    function checkMoveIsValid(moveObject){
        
    }

    function printMove(sourceSquare, targetSquare, piece){
        const gameCopy = new Chess(game.fen())
        const move = {
            from: sourceSquare,
            to: targetSquare
        }
        console.log(piece)
        // if(isConnected){
        //     ws.sendMsg(move)
        // }

        try {
            gameCopy.move(move)
        } catch (error) {
            console.error("invalid move")
            return false    
        }
        // console.log(gameCopy.pgn())
        setGame(gameCopy)
        console.log(move)
        ws.sendMove(move)
        return true    
        
    }

    return (
        <>
        { isConnected ? (<Chessboard boardOrientation={color} position={game.fen()} onPieceDrop={printMove} boardWidth="400" boardHeight="400"/>) : (<p>Waiting for other player...</p>)}
        </>
    )
}


