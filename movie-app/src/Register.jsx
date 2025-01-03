import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Joi validation schema
  const schema = Joi.object({
    username: Joi.string().min(3).required().label("Username"),
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
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

    // Check if a user is already registered
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      alert("A user is already registered. Please log in.");
      navigate("/loginform");
      return;
    }

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(data));
    alert("Registration successful! Please log in.");
    navigate("/loginform");
  };

  const hasErrors = Object.values(errors).some(
    (error) => error !== null && error !== undefined
  );

  const isFormValid =
    !hasErrors &&
    Object.keys(data).every((key) => data[key].trim() !== "");

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
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-900 focus:ring-2 focus:ring-red-900 focus:outline-none"
          />
          {errors.username && <span className="text-red-500">{errors.username}</span>}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            autoComplete="email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-900 focus:ring-2 focus:ring-red-900 focus:outline-none"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
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
            autoComplete="new-password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-900 focus:ring-2 focus:ring-red-900 focus:outline-none"
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 text-white bg-red-900 font-medium rounded-lg transition ${
            !isFormValid
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-900 hover:bg-red-950"
          }`}
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
