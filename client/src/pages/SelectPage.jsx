import { useState, useEffect } from "react";
import {
  blackPawn,
  blackKnight,
  blackBishop,
  blackRook,
  blackQueen,
  blackKing,
  whitePawn,
  whiteKnight,
  whiteBishop,
  whiteRook,
  whiteQueen,
  whiteKing,
} from "../assets/chessPieces/images.js";
import clipboard from "../assets/Clipboard.svg";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import SelectButton from "../components/SelectButton";

export default function SelectPage(props) {
  const [option, setOption] = useState("");
  const [selected, setSelected] = useState(false);

  const buttons = [
    { text: "1 v 1 with friends", buttonOption: "friends" },
    { text: "1 v 1 with online", buttonOption: "online" },
    { text: "1 v 1 with a fish...", buttonOption: "fish" },
    { text: "Create a tourney", buttonOption: "tourney" },
  ];

  const pieces = [
    blackPawn,
    blackKnight,
    blackBishop,
    blackRook,
    blackQueen,
    blackKing,
    whitePawn,
    whiteKnight,
    whiteBishop,
    whiteRook,
    whiteQueen,
    whiteKing,
  ];

  const fallingPieces = [];

  const pieceData = [
    ["10%", "2.5s", "0s"],
    ["20%", "2.3s", "0.2s"],
    ["30%", "2.4s", "0.4s"],
    ["40%", "2.7s", "0.1s"],
    ["50%", "2.6s", "0.7s"],
    ["60%", "2.4s", "0.2s"],
    ["70%", "2.1s", "0.7s"],
    ["80%", "2.4s", "0.9s"],
    ["90%", "2.9s", "0.9s"],
    ["12%", "2.2s", "1.1s"],
    ["87%", "2.5s", "0s"],
    ["85%", "2.3s", "-1.1s"],
    ["75%", "2.4s", "-1.2s"],
    ["65%", "2.7s", "-1.3s"],
    ["55%", "2.6s", "1.4s"],
    ["45%", "2.4s", "1.5s"],
    ["35%", "2.1s", "-1.6s"],
    ["25%", "2.4s", "1.7s"],
    ["15%", "2.9s", "1.8s"],
    ["5%", "2.2s", "1.9s"],
    ["3%", "2.5s", "0s"],
    ["13%", "2.3s", "1.3s"],
    ["23%", "2.4s", "1.4s"],
    ["33%", "2.7s", "-1.5s"],
    ["43%", "2.6s", "-1.6s"],
    ["53%", "2.4s", "1.2s"],
    ["63%", "2.1s", "-1.7s"],
    ["73%", "2.4s", "-1.8s"],
    ["83%", "2.9s", "1.9s"],
    ["93%", "2.2s", "1.1s"],
    ["7%", "2.2s", "1.1s"],
    ["17%", "2.9s", "-0.9s"],
    ["27%", "2.4s", "0.1s"],
    ["37%", "2.1s", "0.7s"],
    ["47%", "2.4s", "-0.2s"],
    ["57%", "2.6s", "0.7s"],
    ["67%", "2.7s", "0.9s"],
    ["77%", "2.4s", "-0.4s"],
    ["87%", "2.3s", "-0.2s"],
    ["90%", "2.5s", "0.3s"],
  ];

  function FallingPiece(propsy) {
    const { position, animationDuration, animationDelay } = propsy;
    const size = Math.round(Math.random() * (60 - 30 + 1) + 30);
    return (
      <div
        style={{
          animation: `fall${Math.round(Math.random() + 1)} ${animationDuration} linear infinite ${animationDelay}`,
          left: `${position}`,
          height: `${size}px`,
          width: `${size}px`,
        }}
        className={`absolute flex w-[30px] h-[30px] top-[-100px]`}
      >
        {/* Math.random() * (max - min + 1) + min */}
        <img src={pieces[Math.floor(Math.random() * (11 - 0 + 1)) + 0]} />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className={`w-[300%] sm:w-[150%] h-[100%] absolute flex justify-evenly items-center transition-transform duration-500 ${selected ? "translate-x-[-33%]" : ""}`}
      >
        {/* div with falling chess pieces animation   */}
        <div
          style={{
            opacity: selected ? 0 : 1,
          }}
          className={`w-[600px] h-[600px] bottom-[0px] relative transition-[transform,opacity] duration-[500,1000] overflow-hidden opacity-100`}
        >
          {pieceData.map((data, index) => (
            <FallingPiece
              key={index}
              position={data[0]}
              animationDuration={data[1]}
              animationDelay={data[2]}
            />
          ))}

          {/*
        <div className="z-50 absolute flex w-[30px] left-[20%] h-[30px] animate-[fall2_5.3s_linear_infinite_.2s]">
          <img src={whiteRook} />
        </div>
        <div className="z-50 absolute flex w-[30px] h-[30px] left-[30%] animate-[fall1_6s_linear_infinite_.3s]">
          <img src={blackQueen} />
        </div>
        <div className="z-50 absolute flex w-[30px] h-[30px] left-[45%] animate-[fall1_5s_linear_infinite_.1s]">
          <img src={blackBishop} />
        </div>
        <div className="z-50 absolute flex w-[30px] h-[30px] left-[60%] animate-[fall1_4s_linear_infinite_.2s]">
          <img src={whiteKnight} />
        </div>
        <div className="z-50 absolute flex w-[30px] h-[30px] left-[80%] animate-[fall2_5.1s_linear_infinite_.5s]">
          <img src={blackKing} />
        </div> */}
        </div>
        <div
          className={`flex flex-col justify-evenly items-center w-0 sm:w-[450px] h-[600px] transition-transform duration-500`}
        >
          {buttons.map((button, index) => (
            <SelectButton
              key={index}
              text={button.text}
              buttonOption={button.buttonOption}
              {...{ option, selected, setOption, setSelected }}
            />
          ))}

          <div className="w-[300px]">
            <div
              onClick={function () {
                setSelected(false);
                setOption("");
              }}
              className={`${selected ? "translate-x-[-60%]" : "opacity-0"} text-black border-black border-[3px] rounded-[10px] w-1/2 text-center shadow-[4px_4px_3px_rgba(0,0,0,0.3)] transition-opacity duration-200`}
            >
              Back
            </div>
          </div>
        </div>
        <div
          className={`w-[450px] h-[600px] flex items-center transition-transform overflow-visible duration-500`}
        >
          <div className="w-[100%] h-[80%] flex justify-center items-center text-black border-black border-[3px] rounded-[30px] shadow-[4px_4px_3px_rgba(0,0,0,0.3)]">
            <div className="w-[90%]">
              <div className="text-center text-[22px] mb-[20px]">
                The game will start when another person joins with this link!
              </div>
              <div className="flex justify-center items-center">
                {/* <div className="border-2 border-black bg-white px-[5px] rounded-[10px]">
                  <p>http://awodhawdoijoiajwofh.....</p>
                </div> */}
                <input
                  type="text"
                  value="http://awodhawdoijoiajwofh...."
                  readonly
                  className="bg-white w-[80%] border-black border-2 py-[5px] px-[15px] rounded-[20px]"
                />
                <button className="bg-white rounded-[25px] ml-[5px] py-[5px] px-[10px] w-[75px] border-black border-2 text-center">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
