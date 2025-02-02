import { useState } from "react";

export default function MatchPage(props) {
  const matches = [
    {
      result: "win",
      opponent: "unknown",
      gameType: "friendly",
      gameMode: "Bullet",
      date: "Jan-03-2023",
    },
    {
      result: "loss",
      opponent: "unknown",
      gameType: "online",
      gameMode: "rapid",
      date: "Feb-02-2022",
    },
    {
      result: "win",
      opponent: "player931",
      gameType: "stockfish",
      gameMode: "",
      date: "Feb-01-2022",
    },
  ];

  function MatchItem(proppy) {
    function ItemBlock(texts) {
      const { text } = texts;
      return <div className="flex items-center">{text}</div>;
    }

    return (
      <div className="border-[1px] border-black px-[30px] flex justify-between w-full h-[50px]">
        <ItemBlock text="result" />
        <ItemBlock text="opponent" />
        <ItemBlock text="gameType" />
        <ItemBlock text="gameMode" />
        <ItemBlock text="date" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[80%] h-[80%] bg-red-200 flex flex-col justify-between">
        <div className="text-black border-b-2 border-black">Matches</div>
        <div className="bg-green-400 flex flex-col flex-1 gap-[10px]">
          <MatchItem />
          <MatchItem />
          <MatchItem />
        </div>
      </div>
    </div>
  );
}
