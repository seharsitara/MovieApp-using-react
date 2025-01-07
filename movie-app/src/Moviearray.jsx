import * as genresAPI from  "./Genrearray";


   



   
export const movies = [
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
  return savedMovies ? JSON.parse(savedMovies) : [...movies];
  
}
            

export function getMovies(id) {
 return movies.find(m => m.id === id);
  
  
}




/*export function saveMovie(movie) {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  console.log("isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    console.log("User not logged in. Movie not saved.");
    return null; // Exit if the user is not logged in
  }

  // Load current movies from localStorage or initialize as empty array
let preMovies=movieArray();
  let existingMovies = JSON.parse(localStorage.getItem("movies")) || [];
  console.log("Existing Movies:", existingMovies);

  // Check if the movie already exists
  let movieDb = existingMovies.find((m) => m.id === movie.id) || {};

  // Update or add movie details
  movieDb.title = movie.title;
  movieDb.genre = genresAPI.genres.find((g) => g._id === String(movie.genre));
  movieDb.stock = movie.stock;
  movieDb.rating = movie.rating;

  if (!movieDb.id) {
    // If it's a new movie, assign an ID and add it to the list
    movieDb.id = Date.now().toString();
    existingMovies.push(movieDb);
  } else {
    // Update existing movie details
    existingMovies = existingMovies.map((m) =>
      m.id === movieDb.id ? movieDb : m
    );
  }

  // Save updated movies list to localStorage
  localStorage.setItem("movies", JSON.stringify(existingMovies,[...preMovies]));
  console.log("Movie saved successfully:", movieDb);
  return movieDb;
}*/
export function saveMovie(movie) {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    alert("Please log in to save your movie preferences. Log in now to access and save movies to your collection.");
    console.log("User not logged in. Movie not saved.");
    return null; // Exit if the user is not logged in
  }

  // Load current movies from localStorage or initialize as an empty array
  const existingMovies = JSON.parse(localStorage.getItem("movies")) || [];
  const preMovies = movieArray(); // Assuming this retrieves additional predefined movies
  console.log("Existing Movies:", existingMovies);

  // Check if the movie already exists in localStorage
  let movieDb = existingMovies.find((m) => m.id === movie.id) || null;

  // Update or add movie details
  const updatedMovie = {
    ...movieDb, // Use existing details if the movie already exists
    id: movieDb?.id || Date.now().toString(), // Assign a new ID for new movies
    title: movie.title,
    genre: genresAPI.genres.find((g) => g._id === String(movie.genre)), // Find genre by ID
    stock: movie.stock,
    rating: movie.rating,
  };

  if (!movieDb) {
    // If it's a new movie, add it to the list
    existingMovies.push(updatedMovie);
  } else {
    // Update existing movie details
    const movieIndex = existingMovies.findIndex((m) => m.id === movieDb.id);
    existingMovies[movieIndex] = updatedMovie;
  }

  // Remove duplicates by ensuring preMovies only adds unique movies
  const uniquePreMovies = preMovies.filter(
    (preMovie) => !existingMovies.some((savedMovie) => savedMovie.id === preMovie.id)
  );

  // Combine uniquePreMovies with updated existingMovies
  const allMovies = [...uniquePreMovies, ...existingMovies];
  localStorage.setItem("movies", JSON.stringify(allMovies));

  console.log("Movie saved successfully:", updatedMovie);
  return updatedMovie;
}
