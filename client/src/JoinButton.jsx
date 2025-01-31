import { useState } from "react";
import Clipboard from "./assets/Clipboard.svg";
import { v4 } from "uuid";

export default function JoinButton(props) {
  let [clicked, setClicked] = useState(false);
  let [inputText, setInputText] = useState("");
  let { gameId, setGameId } = props;
  //let {startConnection} = props

  return (
    //p, div, p will all only be rendered if clicked
    <div
      style={{
        width: clicked ? "400px" : "100px",
        height: clicked ? "250px" : "50px",
      }}
      onClick={() => {
        if (!clicked) {
          setClicked(true);
        }
      }}
      //old class name was button-container
      className="rounded-[20px] border-black border-[3px] w-[400px] h-[250px] transition-[width, height] duration-500 overflow-hidden"
    >
      {!clicked ? (
        <div
          style={{
            opacity: clicked ? 0 : 1,
          }}
          //old class - wrapper
          className="flex items-center justify-evenly flex-col h-full w-full transition-opacity duration-500"
        >
          <p>Join Game</p>
        </div>
      ) : (
        <div
          style={{
            opacity: clicked ? 1 : 0,
          }}
          //wrapper
          className="rounded-[20px] flex items-center justify-evenly flex-col h-full w-full transition-opacity duration-500"
        >
          <div className="rounded-[20px] w-full justify-center flex">
            <input
              text={gameId}
              onChange={(event) => {
                setGameId(event.target.value);
              }}
              className="bg-white px-[15px] py-[10px] w-[70%] border-black border-2"
            ></input>
          </div>
          <p
            onClick={() => {
              props.setStartGame(true);
            }}
            //find-match-msg
            className="text-green-500 hover:[text-decoration:underline] hover:text-green-700 hover:[cursor:default]"
          >
            Find match
          </p>
          <p
            onClick={() => {
              setClicked(false);
            }}
            className="text-red-500 hover:[text-decoration:underline] hover:text-red-700 hover:[cursor:default]"
          >
            Cancel match
          </p>
        </div>
      )}
    </div>
  );
}
