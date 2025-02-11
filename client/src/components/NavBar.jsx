import navburger from "../assets/navburger.svg";
import x from "../assets/x.svg";
import Tourneys from "../assets/Tourneys.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar(props) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [turn, setTurn] = useState(false);
  //nav bar slides across
  function setClickedFalse() {
    setClicked(false);
  }

  const buttonInfo = [
    ["Game Test", "/Game"],
    ["Profile", "/Profile"],
    ["Play", "/"],
    ["Matches", "/Match"],
    ["About the Website", "/About"],
    ["Login", "/Login"],
  ];

  function Divider() {
    return <div className="border-[1px] border-black w-full"></div>;
  }

  function NavButton(propper) {
    const { text, link } = propper;
    return (
      <>
        <div
          className="text-black group bg-gray-300 cursor-pointer"
          onClick={setClickedFalse}
        >
          <div
            onClick={() => navigate(link)}
            className="relative pl-[20px] text-[20px] py-[10px] bg-nav group-hover:translate-x-[10px] ease transition-transform duration-2000"
          >
            {text}
          </div>
        </div>
        <Divider />
      </>
    );
  }

  return (
    <>
      <div className="z-20 px-[10px] flex justify-between items-center w-full h-[50px] absolute top-0">
        <div
          onClick={setClickedFalse}
          className={`fixed w-screen h-screen z-15 bg-gray-200 m-0 top-0 left-0 opacity-30 ${!clicked ? "hidden" : ""}`}
        ></div>
        <div
          className={`fixed w-[30%] border-l-2 border-black h-screen bg-nav z-[30] top-0 right-0 transition-transform duration-250 ${!clicked ? "translate-x-full" : ""}`}
        >
          <div className="relative top-[50px]">
            <Divider />
            {buttonInfo.map((info, index) => (
              <NavButton key={index} text={info[0]} link={info[1]} />
            ))}
          </div>
        </div>
        <div className="w-auto ml-[5px] flex items-center">
          <div className="inline">
            <p className="text-[36px] text-black">Chess</p>
          </div>
          <div className="inline mt-[5px]">
            <img src={Tourneys} />
          </div>
          {/* <p className="inline text-[20px]">Tourneys</p> */}
        </div>
        <div
          onClick={function () {
            // console.log("clicked");
            setClicked(!clicked);
          }}
          className={`z-[40] flex justify-center items-center h-[50px] w-[50px] cursor-pointer transition-transform duration-100 ${clicked ? "rotate-[180deg]" : "rotate-0"}`}
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
