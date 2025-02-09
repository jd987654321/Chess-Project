import navburger from "../assets/navburger.svg";
import x from "../assets/x.svg";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar(props) {
  const { navigate } = props;
  const [clicked, setClicked] = useState(false);
  const [turn, setTurn] = useState(false);
  //nav bar slides across
  function setClickedFalse() {
    setClicked(false);
  }

  return (
    <>
      <div className="z-20 px-[10px] flex justify-between items-center w-full h-[50px] bg-yellow-600 absolute top-0">
        <div
          onClick={setClickedFalse}
          className={`fixed w-screen h-screen z-15 bg-gray-200 m-0 top-0 left-0 opacity-30 ${!clicked ? "hidden" : ""}`}
        ></div>
        <div
          className={`fixed w-[30%] h-screen bg-red-300 z-[30] top-0 right-0 transition-transform duration-250 ${!clicked ? "translate-x-full" : ""}`}
        >
          <div className="relative top-[50px] left-[20px]">
            <div onClick={setClickedFalse}>
              <Link to="/Game">Game Test</Link>
            </div>
            <div onClick={setClickedFalse}>
              <Link to="/Profile">Profile</Link>
            </div>
            <div onClick={setClickedFalse} className="">
              <Link to="/">Play</Link>
            </div>
            <div onClick={setClickedFalse} className="">
              <Link to="/Match">Matches</Link>
            </div>
            <div onClick={setClickedFalse}>
              <Link to="/About">About the Website</Link>
            </div>
            <div onClick={setClickedFalse}>
              <Link to="/Login">Login</Link>
            </div>
          </div>
        </div>
        <div>
          <p className="inline">Chess</p>
          <p className="inline">Tourneys</p>
        </div>
        <div
          onClick={function () {
            console.log("clicked");
            setClicked(!clicked);
          }}
          className={`z-[40] flex justify-center items-center h-[50px] w-[50px] transition-transform duration-100 ${clicked ? "rotate-[180deg]" : "rotate-0"}`}
        >
          <img
            src={clicked ? x : navburger}
            alt="nav hamburger"
            className="w-[40px] h-[40px]"
          />
        </div>
      </div>
    </>
  );
}
