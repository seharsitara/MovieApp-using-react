
  export const genres = [

     {
        id: "1",
        name: "Comedy"
    },
    {
        id: "2",
        name: "Thriller"
    },
    {
        id: "3",
        name: "Action"
    }

]
export function getGenres() {
    return genres.filter(g => g);
  }
  


