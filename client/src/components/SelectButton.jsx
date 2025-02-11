import { useState, useEffect } from "react";

export default function SelectButton(props) {
  const { text, buttonOption, option, selected, setOption, setSelected } =
    props;
  return (
    <div
      onClick={function () {
        setSelected(true);
        setOption(buttonOption);
      }}
      className={`${
        option !== buttonOption && selected
          ? "translate-x-[-30%] opacity-50"
          : ""
      } flex justify-center items-center w-[300px] h-[50px] text-black border-black border-[3px] rounded-[10px] 
       shadow-[4px_4px_3px_rgba(0,0,0,0.3)] transition-transform duration-250`}
      //    shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
    >
      {text}
    </div>
  );
}
