import Pagination from './Pagination';
import Moviestable from './Moviestable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Movielist from './Movielist';
import { movieArray, getMovies } from './Moviearray';
import {genres, getGenres} from './Genrearray';
import Customer from './Customer';
import Rental from './Rental';
import _, { get } from "lodash";
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './Searchbox';



const Movies=()=>{
  //const [callMovie , setCallMovie] = useState(Moviearray());
   const [callMovie,setCallMovie] = useState([]);
  const  [pageCount,setPageCount]=useState(4);
  const [searchQuery,setSearchQuery]=useState("");
 
    let [callGenre,setCallGenre]=useState([]);
 // console.log(genreArr)
 
  let [currentPage, setCurrentPage]=useState(1);
 
 const[genreSelect,setGenreSelect]=useState(null);
 
 // const[allGenre,setAllGenre]=useState([]);
  //const [movieArr,setMovieArr]=useState([]);
  //callGenre = [{id:" ",name:"All Genres "},...getGenres()]
  //console.log(`hhhhhhhhh ${callGenre}`)
  
  useEffect(() => {
    // Check what is fetched
    
    const genresList = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setCallGenre(genresList);
    
    setCallMovie(movieArray());
   
  }, []);
  
  


  console.log(callMovie)

  const[path,setPath]=useState('path');
const[order,setOrder]=useState('asc');

 let filteredMov=callMovie;
 if(searchQuery){
   filteredMov=callMovie.filter((m)=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
 }
 else if(genreSelect && genreSelect.id){
  filteredMov= callMovie.filter((m)=> m.genre.id === genreSelect.id )
 }
  
    const sorting=_.orderBy(filteredMov,[path],[order]);

    const startIndex=(currentPage-1)*pageCount;
    const endIndex=startIndex+pageCount;
    const moviesToDisplay=sorting.slice(startIndex,endIndex);
  
    //if (sort.length === 0 || filteredMov !== sort) {
   //   setSort(filteredMov);
    //}
  
   
    
    

  const likedBtn=(movie)=>{
    console.log('you like this');
  }

  const btnHandler=(movie)=>{
    console.log("clicked")
  }

  const pageHandler=(page)=>{
    console.log(page);
    setCurrentPage( page)
    
  }

  const handleSearchbox=(e)=>{
     const query= e.target.value;
     console.log(`queryyyyyyyyyyyyyyyyy ${query}`)
     setSearchQuery(query);
     setCurrentPage(1)
    setGenreSelect(null);
  }

 const allMovies=(item)=>{
    console.log(`genreeeeeee:${item}`)
    setGenreSelect(item)
    setCurrentPage(1);
    
   // setAllGenre(Genrearray());
   // console.log(`setAllGenre : ${setAllGenre}`)
    // setMovieArr(moviesToDisplay);
 }


 



 const handleSorting=(newPath)=>{
  console.log(newPath)
 if(newPath===path){
      setOrder(order==='asc' ? 'desc' : 'asc');
    
    
  }
   else{
  setPath(newPath);
  setOrder('asc');
}
 }

 

   
  return(
    <>
    <div className="flex flex-row gap-5 md:gap-10 lg:flex-col-1 w-full mt-20 lg:gap-20 ">
  {/* Left Section */}
  <div className="mt-28 md:mt-16">
    <Link
      to="/movies/new"
      className="text-black bg-red-900 p-2 rounded-lg md:text-center mb-5"
    >
      New Movies
    </Link>
    <SearchBox className=""
    value={searchQuery} handleSearchbox={handleSearchbox}
     />
    <Movielist
      className=""
      items={callGenre}
      allMovies={allMovies}
      genreSelect={genreSelect}
    />
  </div>

  {/* Right Section */}
  <div className="mt-14 md:mt-2">
    <Moviestable
      sort={moviesToDisplay}
      btnHandler={btnHandler}
      handleSorting={handleSorting}
    />
    <Pagination
      movieCount={filteredMov.length}
      pageCount={pageCount}
      onPageChange={pageHandler}
      currentPage={currentPage}
    />
  </div>
</div>

</>
  );
}

export default Movies;