import { useState, useEffect } from "react";
import SelectButton from "../components/SelectButton";

export default function SelectPage(props) {
  const [option, setOption] = useState("");
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div
        className={`w-[35%] h-[600px] bg-green-500 transition-transform duration-500 ${selected ? "translate-x-[-150%]" : ""}`}
      >
        <p>Lets play some chess yo {"("}:</p>
      </div>
      <div
        className={`flex flex-col justify-evenly items-center w-0 sm:w-[35%] h-[600px] bg-green-700 transition-transform duration-500 ${selected ? "translate-x-[-150%]" : ""}`}
      >
        <SelectButton
          text="1 v 1 with friends"
          buttonOption="friends"
          {...{ option, selected, setOption, setSelected }}
        />
        <SelectButton
          text="1 v 1 with online"
          buttonOption="online"
          {...{ option, selected, setOption, setSelected }}
        />
        <SelectButton
          text="1 v 1 with a fish..."
          buttonOption="fish"
          {...{ option, selected, setOption, setSelected }}
        />
        <SelectButton
          text="Create a tournament"
          buttonOption="tourney"
          {...{ option, selected, setOption, setSelected }}
        />

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
    </>
  );
}
