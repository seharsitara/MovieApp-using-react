import React from "react";
import { Link } from "react-router-dom";

const Moviestable = (props) => {
  const { sort, btnHandler, handleSorting } = props;

  return (
    <div className="w-full p-2 mt-4 shadow-lg overflow-x-auto">
      <table className="table-auto w-full rounded-md">
        {/* Table Head */}
        <thead>
          <tr>
            <th
              className="p-6 text-center cursor-pointer bg-red-900 text-white font-semibold text-lg hover:bg-red-950 transition-all select-none focus:outline-none"
              onClick={() => handleSorting("title")}
            >
              Title
            </th>
            <th
              className="p-6 text-center cursor-pointer bg-red-900 text-white font-semibold text-lg hover:bg-red-950 transition-all select-none focus:outline-none"
              onClick={() => handleSorting("genre.name")}
            >
              Genre
            </th>
            <th
              className="p-6 text-center cursor-pointer bg-red-900 text-white font-semibold text-lg hover:bg-red-950 transition-all select-none focus:outline-none"
              onClick={() => handleSorting("stock")}
            >
              Stock
            </th>
            <th
              className="p-6 text-center cursor-pointer bg-red-900 text-white font-semibold text-lg hover:bg-red-950 transition-all select-none focus:outline-none"
              onClick={() => handleSorting("rating")}
            >
              Rate
            </th>
            <th className="p-6 text-center bg-red-900 text-white font-semibold text-lg">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {sort.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-100">
              <td className="p-6 text-center text-sm md:text-base">
                <Link
                  to={`/moviestitle/${movie.id}`}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  {movie.title}
                </Link>
              </td>
              <td className="p-6 text-center text-sm md:text-base">
                {movie.genre ? movie.genre.name : "N/A"}
              </td>
              <td className="p-6 text-center text-sm md:text-base">
                {movie.stock}
              </td>
              <td className="p-6 text-center text-sm md:text-base">
                {movie.rating}
              </td>
              <td className="p-6 text-center">
                <button
                  onClick={() => btnHandler(movie)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm md:text-base focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moviestable;
