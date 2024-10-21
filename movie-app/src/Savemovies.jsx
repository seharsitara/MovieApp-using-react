import React from "react";
import Moviearray from "./Moviearray";
import * as genresAPI from './Genrearray'
import Genrearray from "./Genrearray";
import { string } from "joi";

const Savemovies=()=>{
    const genres=Genrearray();
  const movies=Moviearray();

  const getMovies=(id)=>{
    return movies.find(m => m.id === id)  || null;
    
  }

  const saveMovie=(movie)=>{
    let movieDb=movies.find(m=>m.id === movie.id) || {};
    movieDb.title=movie.title;
    console.log(`title  ${movieDb.title}`)
   /*  const foundGenre = genres.find((g) => {
      console.log(`Comparing genre id: ${g.id} with movie genre: ${String(movie.genre)}`); // Debugging
      return g.id === String(movie.genre);
  });


  if (foundGenre) {
    console.log(`Found genre name: ${foundGenre.name}`); // Check if genre name exists
    movieDb.genre = foundGenre.name; // This line might be setting undefined
  } else {
    console.log('Genre not found or has no name');
  }
  movieDb.genre = foundGenre ? foundGenre.name : undefined;*/
 movieDb.genre = genres.find(g => (g.id) === (movie.genre))?.name;
 console.log(`genre ${movieDb.genre}`)
    movieDb.stock=movie.stock;
    console.log(`stock  ${movieDb.stock}`)
    movieDb.rate=movie.rate;
    console.log(`rate  ${movieDb.rate}`)
    
    if(!movieDb.id){
      movieDb.id=Date.now().toString();
      movies.push(movieDb);
      console.log(`XXXXXXXXXXXXXXXXXXXXXXX ${movieDb}`)
    }
    return movieDb;
  }
  return {
    saveMovie,
    getMovies
  };
    };
    

export default Savemovies;