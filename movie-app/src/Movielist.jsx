import React from "react";
import {Link} from "react-router-dom";


const Movielist = (props) => {
  const { items, allMovies, genreSelect } = props;
  return (
    <ul className="w-full bg-red-900 shadow-md mt-4  rounded-lg p-4">
     

      {items.map((item) => (
        <li
          key={item.id}
          className={`p-2 rounded-lg mb-2 cursor-pointer ${
            genreSelect && genreSelect.id === item.id
              ? "bg-red-950 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => allMovies(item)}
        >
          
          <span className="block truncate">{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Movielist;





