import React, { useState, useEffect } from "react";
import Joi from "joi";
import { genres, getGenres } from "./Genrearray";
import { saveMovie, getMovies } from "./Moviearray";
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

  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().required().label("title"),
    genre: Joi.number().required().label("genre"),
    stock: Joi.number().min(0).max(100).required().label("stock"),
    rating: Joi.number().min(0).max(100).required().label("rating"),
  });

  const fetchData = () => {
    if (isFetched) return;

    const fetchGenres = () => {
      const genres = getGenres();
      setGenre(genres);
    };

    const fetchMovie = () => {
      if (movieId === "new") return;

      const movie = getMovies(movieId);
      if (!movie) return navigate("/not-found");

      setData(mapToViewModel(movie));
    };

    fetchMovie();
    fetchGenres();
    setIsFetched(true);
  };

  const mapToViewModel = (movie) => {
    return {
      id: movie.id,
      title: movie.title || "",
      genre: movie.genre.id || "",
      stock: movie.stock || "",
      rating: movie.rating || "",
    };
  };

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
    const updatedValue = name === "genre" ? parseInt(value, 10) : value;
    setData({ ...data, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    submitSave();
  };

  const submitSave = () => {
    saveMovie(data);
    navigate("/movies");
  };

  if (!isFetched) {
    fetchData();
  }

  return (
    <div className="w-full mt-28 px-4">
      <form className="text-xl font-semibold md:w-3/4 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={data.title}
          onChange={changeHandler}
          autoComplete="current-title"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-900 focus:outline-none"
          autoFocus
        />
        {errors.title && (
          <span className={`block mt-2 text-sm ${errors.title.includes("correct") ? "text-green-600" : "text-red-600"}`}>
            {errors.title}
          </span>
        )}

        <label htmlFor="genre" className="block text-gray-700 mt-6 mb-2">Genre</label>
        <select
          id="genre"
          name="genre"
          value={data.genre}
          onChange={changeHandler}
          autoComplete="current-genre"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-900 focus:outline-none"
        >
          <option value="">Select a Genre</option>
          {Array.isArray(genre) &&
            genre.map((g) => (
              <option
                key={g._id}
                value={g._id}
                className="text-gray-700 hover:bg-blue-100 w-6"
              >
                {g.name}
              </option>
            ))}
        </select>
        {errors.genre && (
          <span className={`block mt-2 text-sm ${errors.genre.includes("correct") ? "text-green-600" : "text-red-600"}`}>
            {errors.genre}
          </span>
        )}

        <label htmlFor="stock" className="block text-gray-700 mt-6 mb-2">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={data.stock}
          onChange={changeHandler}
          autoComplete="current-stock"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-900 focus:outline-none"
        />
        {errors.stock && (
          <span className={`block mt-2 text-sm ${errors.stock.includes("correct") ? "text-green-600" : "text-red-600"}`}>
            {errors.stock}
          </span>
        )}

        <label htmlFor="rating" className="block text-gray-700 mt-6 mb-2">Rate</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={data.rating}
          onChange={changeHandler}
          autoComplete="current-rating"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-900 focus:outline-none"
        />
        {errors.rating && (
          <span className={`block mt-2 text-sm ${errors.rating.includes("correct") ? "text-green-600" : "text-red-600"}`}>
            {errors.rating}
          </span>
        )}

        <button
          className="bg-red-900 text-white rounded-lg py-2 px-6 mt-8 hover:bg-red-950 focus:ring-2 focus:ring-red-900 focus:outline-none"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Movieloginform;
