import { useState } from "react";
import Clipboard from "./assets/Clipboard.svg";
import { v4 } from "uuid";

export default function PlayButton(props) {
  let [clicked, setClicked] = useState(false);

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
        console.log("div");
        console.log(clicked);
        // }} className="button-container">
      }}
      className="rounded-[20px] border-black border-[3px] [overflow:hidden] w-[400px] h-[250px] transition-all duration-500"
    >
      {!clicked ? (
        <div
          style={{
            opacity: clicked ? 0 : 1,
          }}
          className="flex items-center justify-evenly flex-col h-full w-full transition-[opacity] duration-500"
        >
          <p>Play</p>
        </div>
      ) : (
        <div
          style={{
            opacity: clicked ? 1 : 0,
          }}
          className="flex items-center justify-evenly flex-col h-full w-full transition-[opacity] duration-500"
        >
          <p className="[white-space:nowrap] mx-[10%] text-[20px]">
            The game will start when another <br />
            player joins with this link!
          </p>
          <div className="w-full flex justify-center">
            <input
              className="rounded-[20px] border-black border-2 bg-white py-[10px] px-[15px] w-[70%]"
              //   className="link"
              value={"http://localhost:5500/" + v4()}
            ></input>
            <img src={Clipboard} />
          </div>
          <p
            onClick={() => {
              setClicked(false);
            }}
            className="text-red-500"
          >
            Cancel match
          </p>
        </div>
      )}
    </div>
  );
}
