import { useState, useEffect } from "react";
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

  return (
    <div
      className={`w-[150%] h-[100%] absolute flex justify-evenly items-center transition-transform duration-500 ${selected ? "translate-x-[-33%]" : ""}`}
    >
      <div
        className={`w-[450px] h-[600px] bg-green-500 transition-transform duration-500`}
      >
        <p>Lets play some chess yo {"("}:</p>
      </div>
      <div
        className={`flex flex-col justify-evenly items-center w-0 sm:w-[450px] h-[600px] bg-green-700 transition-transform duration-500`}
      >
        {buttons.map((button) => (
          <SelectButton
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
            className={`${selected ? "translate-x-[-60%]" : ""} border-black border-[3px] rounded-[10px] w-1/2 text-center`}
          >
            Back
          </div>
        </div>
      </div>
      <div
        className={`w-[450px] h-[600px] bg-green-500 transition-transform duration-500`}
      >
        <p>Lets play some chess yo {"("}:</p>
      </div>
    </div>
  );
}
