import Pagination from './Pagination';
import Moviestable from './Moviestable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Movielist from './Movielist';
import { movieArray, getMovies } from './Moviearray';
import { genres, getGenres } from './Genrearray';
import SearchBox from './Searchbox';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";

const Movies = () => {
  const [callMovie, setCallMovie] = useState([]);
  const [pageCount, setPageCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [callGenre, setCallGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genreSelect, setGenreSelect] = useState(null);
  const [path, setPath] = useState('path');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const genresList = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setCallGenre(genresList);
    setCallMovie(movieArray());
  }, []);

  let filteredMov = callMovie;
  if (searchQuery) {
    filteredMov = callMovie.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  } else if (genreSelect && genreSelect._id) {
    filteredMov = callMovie.filter((m) => m.genre._id === genreSelect._id);
  }

  const sorting = _.orderBy(filteredMov, [path], [order]);
  const startIndex = (currentPage - 1) * pageCount;
  const moviesToDisplay = sorting.slice(startIndex, startIndex + pageCount);

  const pageHandler = (page) => {
    setCurrentPage(page);
  };

  const handleSearchbox = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setGenreSelect(null);
  };

  const allMovies = (item) => {
    setGenreSelect(item);
    setCurrentPage(1);
  };

  const handleSorting = (newPath) => {
    if (newPath === path) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setPath(newPath);
      setOrder('asc');
    }
  };

  return (
    <div className="w-full mt-28 px-4">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="lg:w-1/4 sm:w-1/2 w-3/4 md:mt-8 mt-16 lg:mx-2 mx-auto">
          <Link
            to="/movies/new"
            className="block bg-red-900 text-white py-2 px-2 rounded-lg text-center hover:bg-red-700 transition mb-6"
          >
            New Movies
          </Link>
          <SearchBox
            value={searchQuery}
            handleSearchbox={handleSearchbox}
            className="mb-6"
          />
          <Movielist
            items={callGenre}
            allMovies={allMovies}
            genreSelect={genreSelect}
            className="bg-gray-50 p-4 rounded-lg shadow"
          />
        </div>

        {/* Right Section */}
        <div className="lg:w-3/4">
          <Moviestable
            sort={moviesToDisplay}
            handleSorting={handleSorting}
            className="mb-6 bg-gray-50 p-4 rounded-lg shadow"
          />
          <Pagination
            movieCount={filteredMov.length}
            pageCount={pageCount}
            onPageChange={pageHandler}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
