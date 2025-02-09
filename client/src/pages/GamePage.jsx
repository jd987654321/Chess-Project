import ChessGame from "../ChessGame";

export default function GamePage(props) {
  const { ChessGameProps } = props;
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div>
        <ChessGame {...ChessGameProps} />
      </div>
    </div>
  );
}
