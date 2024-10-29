import React, { useState, useEffect } from "react";
import Joi from "joi";
import {genres, getGenres} from "./Genrearray";
import { saveMovie,getMovies } from "./Moviearray";
import { useParams, useNavigate } from "react-router-dom";

const Movieloginform = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    genre: "",
    stock: "",
    rating: "",
  });

  const [genre, setGenre] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  // Validation schema
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().required().label("title"),
    genre: Joi.number().required().label("genre"),
    stock: Joi.number().min(0).max(100).required().label("stock"),
    rating: Joi.number().min(0).max(100).required().label("rating"),
  });


   
  
  
  
 // useEffect(() => {
  const fetchData = () => {
    if (isFetched) return;

    const fetchGenres = () => {
      const genres = getGenres();
      setGenre(genres);
    };
    

    const fetchMovie = () => {
      
      if (movieId === "new") return;

      const movie = getMovies(movieId);
      console.log(`movieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ${movie}`)
      if (!movie) return navigate("/not-found");

      setData(mapToViewModel(movie));
    };
  
   
    fetchMovie();
    fetchGenres();
    setIsFetched(true); // Ensure fetching happens only once
  };
// });
  
    
  
 
  const mapToViewModel = (movie) => {
    return {
      id: movie.id,
      title: movie.title || "",
      genre: movie.genre.id || "",
      stock: movie.stock || "",
      rating: movie.rating || "",
    };
  };

  
 

  // Form validation
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'genre' ? parseInt(value, 10) : value; // Convert genre id to a number if needed
    setData({ ...data, [name]: updatedValue });
    console.log(`Updated ${name} to:`, updatedValue); // Debug: Log updated field values
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    submitSave();
  };

  const submitSave = () => {
    console.log('Data being saved:', data); // Log data before saving
    const savedMovie = saveMovie(data); // Save the movie
    console.log(`Saved movie: ${JSON.stringify(savedMovie)}`); // Log saved movie details
     navigate('/movies');
  };

  const hasErrors = Object.values(errors).some((error) => error !== null);
  const isFormValid = !hasErrors && Object.keys(data).every((key) => {
    const value = data[key];
    return (
      (typeof value === "string" && value.trim() !== "") ||
      (typeof value === "number" && !isNaN(value) && value >= 0)
    );
  });



  if (!isFetched) {
    fetchData(); // Manually trigger data fetching once
  }


/*import React, { useState,useEffect } from "react";
import Joi, { options } from "joi";
import Genrearray from "./Genrearray";
import Moviearray from "./Moviearray";
import Savemovies from "./Savemovies";
import { useParams,useNavigate } from "react-router-dom";


const Movieloginform=()=>{
  const { id:movieId }=useParams();
  const navigate = useNavigate();


  //const g=Moviearray();
  //console.log(`hyyyyyyyyyyyyyyyyyyyyyyy${g}`)

  const saveMovie = Savemovies();
  const [data,setData]=useState({
         title:'',
         genre:'',
         stock:'',
         rating:''
  });
  const [genre,setGenre]=useState([]);
  const [errors,setErrors]=useState({
   
});


const schema= Joi.object({
    id:Joi.string(),
   title: Joi.string().required().label('title'),
  genre: Joi.string().required().label('genre'),
  stock:Joi.number().min(0).max(100).required().label('stock'),
  rating:Joi.number().min(0).max(100).required().label('rating'),
  
})
const mapToViewModel=(movie)=>{
  return {
    title: movie.title || '', // Ensure title has a default value
    genre: movie.genre || '', // Ensure genre has a default value
    stock: movie.stock || '', // Ensure stock has a default value
    rating: movie.rating || '', // Ensure rating has a default value
  };
}
 
if (genre.length === 0) {
  const genres= Genrearray();
  console.log(`ggggggggggggggggggggggggggggggggg${genres}`);
  setGenre(genres);

  

  console.log(`hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh${genres}`);

  if (movieId !== 'new') {
    const movieData = Moviearray(movieId);
    if (!movieData) navigate('/not-found');
    else setData(mapToViewModel(movieData));
  }
}


  

const validate = () => {
  const options = { abortEarly: false };
  const { error } = schema.validate(data, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

const changeHandler = (e) => {
  const { name, value } = e.target;
  setData({ ...data, [name]: value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors || {});
  if (validationErrors) return;

  submitSave();
};
   


    const submitSave=()=>{
      saveMovie(data);
    }
    
 const hasErrors = Object.values(errors).some(error => error !== null);
    const isFormValid = !hasErrors && Object.keys(data).every(key => {
      const value = data[key];
      return (
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value === 'number' && !isNaN(value) && value >= 0)
    
      );
      

    });
console.log("Is form valid:", isFormValid);
  

  */
  
  return(
    <div className="w-full mt-28">
  <form className="text-2xl font-semibold md:w-3/4 " onSubmit={handleSubmit}>
    <label htmlFor="title" className="block absolute md:left-28 left-10">Title</label>
    <input  type="text" id="title" name="title" value={data.title} onChange={changeHandler} autoComplete="current-title" className=" border-2 border-black       rounded md:p-3 p-2 md:w-full md:ml-20 mt-10 w-full focus:border-blue-500 
     focus:outline-none  focus:bg-blue-50" autoFocus/>
    {errors.title && (<span  className={`${errors.title.includes('correct') ?  'bg-green-200 ': 'bg-red-200 ' }font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full`}>{errors.title}</span>)
    }
     <br/>
    <label htmlFor="genre" className="block absolute md:left-28 left-10 mt-10">Genre</label>
    <select type="text" id="genre" name="genre" value={data.genre} onChange={changeHandler}  autoComplete="current-genre" className="border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-20 w-full focus:border-blue-500 
     focus:outline-none s focus:bg-blue-50 " autoFocus>
    
    <option value="">Select a Genre</option>
          {//Array.isArray(genre) && 
          genres.map(g => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
   
            </select>
    {errors.genre && (<span  className={`font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full ${errors.genre.includes('correct') ?  'bg-green-200 ': 'bg-red-200 '}`}>{errors.genre}</span>)
    }
     <label htmlFor="stock" className="block absolute md:left-28 left-10 mt-10">Stock</label>
    <input type="number" id="stock" name="stock" value={data.stock} onChange={changeHandler}  autoComplete="current-stock" className="border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-20 w-full focus:border-blue-500 
     focus:outline-none  focus:bg-blue-50 " autoFocus />
     {errors.stock && (<span  className={`font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full ${errors.stock.includes('correct') ?  'bg-green-200 ': 'bg-red-200 '}`}>{errors.stock}</span>)
    }
     <br/>
    <label htmlFor="rating" className="block absolute md:left-28 left-10 mt-10">Rate</label>
    <input type="number" id="rating" name="rating" value={data.rating} onChange={changeHandler}  autoComplete="current-rating" className="border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-20 w-full focus:border-blue-500 
     focus:outline-none  focus:bg-blue-50 " autoFocus/>
    {errors.rating && (<span  className={`font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full ${errors.rating.includes('correct') ?  'bg-green-200 ': 'bg-red-200 '}`}>{errors.rating}</span>)
    }
  
    <button className={` border-2 border-red-900 rounded md:mt-10 absolute md:left-32 md:p-2 left-10 p-2 mt-40`} >Save</button>
  </form>
  </div>
  );
}
export default Movieloginform;