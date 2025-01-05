import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

const LoginForm = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Joi validation schema
  const schema = Joi.object({
    username: Joi.string().min(3).required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Validate individual field
    const { error } = schema.extract(name).validate(value);
    setErrors({ ...errors, [name]: error ? error.details[0].message : null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const validation = schema.validate(data, { abortEarly: false });
    if (validation.error) {
      const errorMessages = {};
      validation.error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      return;
    }

    // Fetch stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find((user) => user.username === data.username);

    if (!existingUser) {
      setErrors({ username: "Username not found. Please register first." });
      return;
    }

    if (existingUser.password !== data.password) {
      setErrors({ password: "Incorrect password." });
      return;
    }

    // Login successful
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful!");
    navigate("/movies");
  };

  const hasErrors = Object.values(errors).some(
    (error) => error !== null && error !== undefined
  );

  return (
    <div className="w-full mt-32 px-4">
      <form
        className="text-lg mb-8 font-semibold max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* Username Field */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 mb-2 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={onChangeHandler}
            autoComplete="username"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.username && <span className="text-red-500">{errors.username}</span>}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            autoComplete="current-password"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 text-white font-medium rounded-lg ${
            hasErrors ? "bg-red-300 cursor-not-allowed" : "bg-red-900 hover:bg-red-950"
          }`}
          disabled={hasErrors}
        >
          Login
        </button>
      </form>

      {/* Link to Registration */}
      <div className="text-center mt-4">
        <Link
          className="text-red-900 hover:underline focus:outline-none font-semibold"
          to="/registrationform"
        >
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
