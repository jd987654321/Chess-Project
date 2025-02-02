import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Popup from "./Popup";
import JoinButton from "./JoinButton";
import PlayButton from "./PlayButton";
import ChessGame from "./ChessGame";
import { v4 } from "uuid";
import useSocket from "./useSocket";
import { Chess } from "chess.js";
import SelectPage from "./pages/SelectPage";
import NavBar from "./components/NavBar";
import MatchPage from "./pages/MatchPage";

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
          <Route path="/Match" element={<MatchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
