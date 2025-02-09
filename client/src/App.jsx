import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 } from "uuid";
import useSocket from "./useSocket";
import { Chess } from "chess.js";

import NavBar from "./components/NavBar";

import SelectPage from "./pages/SelectPage";
import MatchPage from "./pages/MatchPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";

export default function App() {
  let [game, setGame] = useState(new Chess());
  let [gameId, setGameId] = useState("");
  let [playerId, setPlayerId] = useState(v4());
  let [playerTurn, setPlayerTurn] = useState("white");
  let [startGame, setStartGame] = useState(false);
  let [validGameId, setValidGameId] = useState("");
  let [foundGame, setFoundGame] = useState(false);
  let [isConnected, setIsConnected] = useState(false);
  let [opponentMove, setOpponentMove] = useState(null);
  let [color, setColor] = useState("white");
  let [ws, setWs] = useState(
    useSocket(
      "http://localhost:8080",
      setOpponentMove,
      setColor,
      game,
      setIsConnected,
      playerId
    )
  );

  //checking if session storage works
  useEffect(() => {
    if (sessionStorage.getItem("playerId") !== null) {
      console.log("Id has already been set");

      return;
    }
    sessionStorage.setItem("playerId", v4());
    console.log("Id has been set");
  }, []);

  //used to start the game
  useEffect(() => {
    if (startGame) {
      ws.connect(gameId);
      console.log(gameId);
      console.log(`Connection status: ${isConnected}`);
      return;
    } else if (isConnected && !startGame) {
      ws.disconnect();
      setIsConnected(false);
    }
  }, [startGame]);

  const ChessGameProps = {
    setOpponentMove: setOpponentMove,
    opponentMove: opponentMove,
    setGame: setGame,
    game: game,
    ws: ws,
    color: color,
    isConnected: isConnected,
    gameId: gameId,
  };

  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-gray-300">
        <NavBar />

        <Routes>
          <Route path="/" element={<SelectPage />} />
          <Route path="/Game" element={<GamePage {...{ ChessGameProps }} />} />
          <Route path="/Match" element={<MatchPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
