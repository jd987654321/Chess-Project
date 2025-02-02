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
        option !== buttonOption && selected ? "translate-x-[-30%]" : ""
      } flex justify-center items-center w-[300px] h-[50px] border-black border-[3px] rounded-[10px] transition-transform duration-250`}
    >
      {text}
    </div>
  );
}
