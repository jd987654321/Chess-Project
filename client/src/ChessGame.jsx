import { useState, useEffect } from 'react'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useWebsocket from './useWebsocket';
import useSocket from './useSocket';

import './ChessGame.css'

export default function ChessGame(props){
    let { gameId } = props
    let [game, setGame] = useState(new Chess())
    let [isConnected, setIsConnected] = useState(false)
    let [ws, setWs] = useState(useSocket("http://localhost:8080", gameId))
    console.log('rendered')
    
    useEffect(() => {
        let connectionResult = ws.connect()
        setIsConnected(connectionResult)
    }, [])


    function printMove(sourceSquare, targetSquare, piece){
        const gameCopy = new Chess(game.fen())
        const move = {
            from: sourceSquare,
            to: targetSquare
        }
        if(isConnected){
            ws.sendMsg(move)
        }

        try {
            gameCopy.move(move)
        } catch (error) {
            console.error("invalid move")
            return false    
        }
        // console.log(gameCopy.pgn())
        setGame(gameCopy)
        return true    
        
    }

    return (
        <Chessboard position={game.fen()} onPieceDrop={printMove} boardWidth="400" boardHeight="400"/>        
    )
}


