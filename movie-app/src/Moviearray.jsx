import * as genresAPI from  "./Genrearray";
import {Link} from "react-router-dom";
   
   const Moviearray=()=>{
  


    
    const movies = [
      // Comedy
      {
          id: 1,
          title: "Superbad",
          genre:  {
            id: 1,
            name: "Comedy"
        },
          stock: 15,
          rating: 7.6
      },
      {
          id: 2,
          title: "Step Brothers",
          genre:  {
            id: 1,
            name: "Comedy"
        },
          stock: 12,
          rating: 6.9
      },
      {
          id: 3,
          title: "The Grand Budapest Hotel",
          genre:  {
            id: 1,
            name: "Comedy"
        },
          stock: 8,
          rating: 8.1
      },
      
      // Thriller
      {
          id: 4,
          title: "Se7en",
          genre:  {
        id: 2,
        name: "Thriller"
    },
          stock: 10,
          rating: 8.6
      },
      {
          id: 5,
          title: "Fight Club",
          genre:  {
        id: 2,
        name: "Thriller"
    },
          stock: 7,
          rating: 8.8
      },
      {
          id: 6,
          title: "Gone Girl",
          genre:  {
        id: 2,
        name: "Thriller"
          },
          stock: 5,
          rating: 8.1
      },
  
      // Action
      {
          id: 7,
          title: "Mad Max: Fury Road",
          genre:  {
            id: 3,
            name: "Action"
        },
          stock: 9,
          rating: 8.1
      },
      {
          id: 8,
          title: "John Wick",
          genre:   {
        id: 3,
        name: "Action"
    },
          stock: 14,
          rating: 7.4
      },
      {
          id: 9,
          title: "Die Hard",
          genre: {
            id: 3,
            name: "Action"
        },
          stock: 11,
          rating: 8.2
      }
  ];
    return ( 
      movies
    );
              

   

   

  }

   export default Moviearray;