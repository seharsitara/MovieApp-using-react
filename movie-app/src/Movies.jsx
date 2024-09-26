import Pagination from './Pagination';
import Moviearray from './Moviearray';
import Moviestable from './Moviestable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Movielist from './Movielist';
import Genrearray from './Genrearray';
import Customer from './Customer';
import Rental from './Rental';


import _ from "lodash";

import { useState } from 'react';

const Movies=()=>{
  const callMovie= Moviearray();
  const  pageCount=4;
  const genreArr=Genrearray();
 // console.log(genreArr)
 
  let [currentPage, setCurrentPage]=useState(1);
 
 const[genreSelect,setGenreSelect]=useState(null)
 
 // const[allGenre,setAllGenre]=useState([]);
  //const [movieArr,setMovieArr]=useState([]);


  
  

  console.log(callMovie)

  const[path,setPath]=useState('path');
const[order,setOrder]=useState('asc');


  const filteredMov = genreSelect && genreSelect.id?
    callMovie.filter((m)=> m.genre.name===genreSelect.name  )  : callMovie;
  
    const sorting=_.orderBy(filteredMov,[path],[order]);

    const startIndex=(currentPage-1)*pageCount;
    const endIndex=startIndex+pageCount;
    const moviesToDisplay=sorting.slice(startIndex,endIndex);
  
    //if (sort.length === 0 || filteredMov !== sort) {
   //   setSort(filteredMov);
    //}
  
    const Genre=[{name:"All Genres "},...Genrearray()]

    

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

 const allMovies=(item)=>{
    console.log(`genre:${item}`)
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
    <div>
     
  <div className='m-12	margin: 3rem;  border-2 border-light-blue-100 h-36	height: 9rem; p-3	padding: 0.75rem; bg-gray-300	--tw-bg-opacity: 1;
background-color: rgba(209, 213, 219, var(--tw-bg-opacity);   '>
    <Movielist  	className='py-1' 
 items={Genre} allMovies={allMovies} genreSelect={genreSelect} ></Movielist>
   </div>
    <div className='py-5'>
      <Moviestable sort={moviesToDisplay} btnHandler={btnHandler}  handleSorting={handleSorting} ></Moviestable>
   
   <Pagination movieCount={filteredMov.length} pageCount={pageCount}  onPageChange={pageHandler}  currentPage={currentPage}></Pagination>
   </div>
   </div>
    </>
  );
}

export default Movies;