
  export const genres = [

     {
        _id: "1",
        name: "Comedy"
    },
    {
        _id: "2",
        name: "Thriller"
    },
    {
        _id: "3",
        name: "Action"
    }

]
export function getGenres() {
    return genres.filter(g => g);
          
  }
  


