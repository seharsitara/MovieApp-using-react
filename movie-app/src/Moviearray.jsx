import * as genresAPI from  "./Genrearray";
import {Link} from "react-router-dom";

   
  const movies = [
      // Comedy
      {
          id: "1",
          title: "Superbad",
          genre:  {
            _id: "1",
            name: "Comedy"
        },
          stock: 15,
          rating: 7.6
      },
      {
          id: "2",
          title: "Step Brothers",
          genre:  {
            _id: "1",
            name: "Comedy"
        },
          stock: 12,
          rating: 6.9
      },
      {
          id: "3",
          title: "The Grand Budapest Hotel",
          genre:  {
            _id: "1",
            name: "Comedy"
        },
          stock: 8,
          rating: 8.1
      },
      
      // Thriller
      {
          id: "4",
          title: "Se7en",
          genre:  {
        _id: "2",
        name: "Thriller"
    },
          stock: 10,
          rating: 8.6
      },
      {
          id:"5",
          title: "Fight Club",
          genre:  {
        _id: "2",
        name: "Thriller"
    },
          stock: 7,
          rating: 8.8
      },
      {
          id: "6",
          title: "Gone Girl",
          genre:  {
        _id: "2",
        name: "Thriller"
          },
          stock: 5,
          rating: 8.1
      },
  
      // Action
      {
          id: "7",
          title: "Mad Max: Fury Road",
          genre:  {
            _id: "3",
            name: "Action"
        },
          stock: 9,
          rating: 8.1
      },
      {
          id: "8",
          title: "John Wick",
          genre:   {
        _id:"3",
        name: "Action"
    },
          stock: 14,
          rating: 7.4
      },
      {
          id: "9",
          title: "Die Hard",
          genre: {
            _id: "3",
            name: "Action"
        },
          stock: 11,
          rating: 8.2
      }
  ];

  export function movieArray() {
    const savedMovies = localStorage.getItem("movies");
  return savedMovies ? JSON.parse(savedMovies) : movies;
    
  }
              

  export function getMovies(id) {
    return movies.find(m => m.id === id);
    
  }

  
  

   export function saveMovie(movie) {
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
 movieDb.genre = genresAPI.genres.find(g => g._id ===  String(movie.genre));
 
 console.log(`genre ${movieDb.genre}`)
    movieDb.stock=movie.stock;
    console.log(`stock  ${movieDb.stock}`)
    movieDb.rating=movie.rating;
    console.log(`rate  ${movieDb.rating}`)
    
    /*if(!movieDb.id){
      movieDb.id=Date.now().toString();
      
      
    }
    console.log(`XXXXXXXXXXXXXXXXXXXXXXX ${JSON.stringify(movieDb)}`)
    setMovies(prevMovies => [...prevMovies, movieDb]);
   // movies.push(movieDb);
    return movieDb;
  }*/
    if (!movieDb.id) {
      movieDb.id = Date.now().toString(); 
      movies.push(movieDb)
    }  

    localStorage.setItem("movies", JSON.stringify(movies));



    // Assign a new ID for new movies
    //setMovies(prevMovies => [...prevMovies, movieDb]); // Save new movie
  // movies.push(movieDb);
   // console.log(`Movie added: ${JSON.stringify(movieDb)}`);
   console.log(`Current Movies Array before update: ${JSON.stringify(movies)}`);
  
  
   /*setMovies(prevMovies => {
    const updatedMovies = [...prevMovies, movieDb];
    console.log(`Current Movies Array after update: ${JSON.stringify(updatedMovies)}`);
    return updatedMovies;

});*/


  
 return movieDb;
}