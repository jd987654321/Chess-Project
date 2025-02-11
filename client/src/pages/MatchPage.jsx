import { useState } from "react";

import data from "../assets/sampleData/matches";

import MatchItem from "../components/MatchItem";

export default function MatchPage(props) {
  const [page, setPage] = useState(1);
  const maxPage = data.length;

  return (
    <div className="flex justify-center h-screen w-screen">
      <div className="w-[80%] h-[700px] mt-[110px] max-w-[950px] flex flex-col ">
        <div className="text-black text-[24px] border-b-2 border-black">
          Matches
        </div>
        <div className="mt-[30px] flex flex-col flex-1 gap-[30px] max-w-[950px]">
          {data[page - 1].map((info, index) => (
            <MatchItem key={index} {...info} />
          ))}
        </div>
        <div className="w-full h-[130px] text-black flex justify-center">
          <div className="mt-[10px] flex gap-[30px]">
            <div
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
              className="shadow-[2px_2px_1px_rgba(0,0,0,0.3)] cursor-pointer w-[40px] h-[40px] border-black border-2 text-[30px] flex justify-center items-center"
            >
              <svg
                class="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="select-none h-[40px] w-[100px] flex justify-center items-center">
              {`${page} of ${maxPage}`}
            </div>
            <div
              onClick={() => {
                if (page < maxPage) {
                  setPage(page + 1);
                }
              }}
              className="shadow-[2px_2px_1px_rgba(0,0,0,0.3)] cursor-pointer w-[40px] h-[40px] border-black border-2 text-[30px] flex justify-center items-center"
            >
              <svg
                class="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
