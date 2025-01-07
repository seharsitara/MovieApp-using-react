import Pagination from './Pagination';
import Moviestable from './Moviestable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Movielist from './Movielist';
import { movieArray, getMovies,movies} from './Moviearray';
import { genres, getGenres } from './Genrearray';
import SearchBox from './Searchbox';
import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import _ from "lodash";


const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveToLocalStorage = (key, data) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved to localStorage under key: ${key}`);
  } else {
    
    console.log("User not logged in. Data not saved to localStorage.");
  }
 
};


const Movies = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

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
  } else {
    filteredMov = callMovie; // Show all movies when "All Genres" is selected
  }


  console.log("Selected Genre:", genreSelect);
console.log("Movies:", callMovie);
console.log("Genres:", callGenre);


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


  const deleteBtnHandle = (movie) => {
    
                            
    // Proceed with deletion if the user is logged in
    const updatedMovies = callMovie.filter((m) => m.id !== movie.id);

    // Update state with the new movies list
    setCallMovie(updatedMovies);

    // Save the updated movie list to localStorage
    saveToLocalStorage('movies', updatedMovies);
  };
  
  

  
  const handleLogout = () => {
    console.log("Before Logout:", localStorage);  // Check current localStorage state
    localStorage.setItem("isLoggedIn", "false"); // Or remove it
  localStorage.removeItem("isLoggedIn");  // Remove login status
   localStorage.removeItem("user");  // Remove the entire user object
    localStorage.removeItem("movies");// Remove the movies list
    setCallMovie([]);

    console.log("After Logout:", localStorage);  // Check if items were removed
    navigate("/loginform");  // Navigate to login form
    window.location.reload();  // Reload the page to reflect changes
  };
  

  return (
    <div className="w-full mt-16 px-4 relative">
  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="absolute top-2 right-4 bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition"
  >
    Logout
  </button>

  <div className="flex flex-col lg:flex-row gap-10">
    {/* Left Section */}
    <div className="lg:w-1/4 sm:w-1/2 w-3/4 md:mt-20 mt-20 lg:mx-2 mx-auto">
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
        deleteBtnHandle={deleteBtnHandle}
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
