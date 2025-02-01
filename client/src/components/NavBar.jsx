import navburger from "../assets/navburger.svg";

export default function NavBar(props) {
  return (
    <div className="px-[10px] flex justify-between items-center w-full h-[50px] bg-yellow-500 absolute top-0">
      <div>
        <p className="inline">Chess</p>
        <p className="inline">Tourneys</p>
      </div>
      <div className="h-[40px] w-[40px]">
        <img
          src={navburger}
          alt="nav hamburger"
          className="w-[30px] h-[30px]"
        />
      </div>
    </div>
  );
}
