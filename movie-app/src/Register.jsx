import React, { useState } from "react";
import Joi from "joi";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().min(3).required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    const { error } = schema.extract(name).validate(value);
    setErrors({ ...errors, [name]: error ? error.details[0].message : null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = schema.validate(data);

    if (validation.error) {
      const errorMessages = {};
      validation.error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      return;
    }
  };

  const hasErrors = Object.values(errors).some(
    (error) => error !== null && error !== undefined
  );

  const isFormValid =
    !hasErrors &&
    Object.keys(data).every((key) => data[key].trim() !== "");

  return (
    <div className="w-full mt-24 px-4">
      <h1 className="inline-block text-4xl md:text-5xl font-bold font-sans border-b-2 mx-auto p-4 border-red-900  text-red-900 mb-10 text-center">Register</h1>
      <form
        className="text-lg font-semibold max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-gray-700 mb-2 font-medium"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={onChangeHandler}
            autoComplete="current-username"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-900 focus:ring-2 focus:ring-red-900 focus:outline-none"
            autoFocus
          />
          {errors.username && (
            <span
              className={`block mt-2 text-sm p-2 rounded-lg font-medium text-white ${
                errors.username.includes("correct") ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {errors.username}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            autoComplete="current-password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-900 focus:ring-2 focus:ring-red-900 focus:outline-none"
          />
          {errors.password && (
            <span
              className={`block mt-2 text-sm p-2 rounded-lg font-medium text-white ${
                errors.password.includes("correct") ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {errors.password}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-2 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            autoComplete="current-email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-900 focus:ring-2 focus:ring-red-900 focus:outline-none"
          />
          {errors.email && (
            <span
              className={`block mt-2 text-sm p-2 rounded-lg font-medium text-white ${
                errors.email.includes("correct") ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {errors.email}
            </span>
          )}
        </div>

        <button
          className={`w-full py-3 text-white font-medium rounded-lg transition ${
            isFormValid
              ? "bg-red-900 hover:bg-red-950"
              : "bg-red-300 cursor-not-allowed"
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
