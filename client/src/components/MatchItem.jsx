import whitePawn from "../assets/chessPieces/whitePawn.svg";
import blackPawn from "../assets/chessPieces/blackPawn.svg";

export default function MatchItem({
  result,
  color,
  opponent,
  gameType,
  gameMode,
  date,
}) {
  return (
    <div className=" bg-[#D9D9D9] text-black flex justify-between w-full h-[55px] shadow-[2px_2px_3px_2px_rgba(0,0,0,0.3)]">
      <div
        className={`text-${result === "win" ? "green-500" : "red-500"} flex justify-center items-center text-[20px] w-[80px]`}
      >
        {result.toUpperCase()}
      </div>
      <div className="flex justify-center sm:justify-start w-[200px]">
        <img
          className="mb-[5px]"
          src={color === "white" ? whitePawn : blackPawn}
        />
        <div className="flex ml-[5px] justify-center items-center text-[18px]">
          {opponent}
        </div>
      </div>
      <div className="hidden lg:flex justify-start items-center w-[100px]">
        {gameType}
      </div>
      <div className="hidden md:flex justify-start items-center">
        {gameMode}
      </div>
      <div className="flex justify-center items-center w-[120px]">{date}</div>
    </div>
  );
}
