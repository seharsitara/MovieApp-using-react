import React from "react";

const Movielist = (props) => {
  const { items = [], allMovies, genreSelect } = props;

  console.log("Items:", items); // Debugging
  console.log("GenreSelect:", genreSelect); // Debugging

  return (
    <ul className="w-full bg-red-900 shadow-md mt-4 rounded-lg p-4">
      {items.map((item) => (
        <li
          key={item.id}
          className={`p-2 rounded-lg mb-2 cursor-pointer ${
            genreSelect && genreSelect._id === item._id
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
