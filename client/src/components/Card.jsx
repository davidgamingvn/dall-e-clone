import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex hidden scale-[90%] flex-col w-auto max-h-[95%] absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 m-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-black duration-300 ...">
        <p className="text-white text-md overflow-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-white w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none "
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
