import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { validateForm } from "../scripts/utils";
import API from "../api/api";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  let history = useHistory();

  const login = async e => {
    e.preventDefault();
    const [valid, err] = validateForm(data);
    if (!valid) {
      setErrors(err);
      return;
    }

    API.post("/login", data, { withCredentials: true })
      .then(r => {
        history.push({ pathname: "/chat", state: r.data });
      })
      .catch(e => {
        if (e.response && e.response.status === 403)
          setAuthError(e.response.data["error"]);
        else throw e;
      });
  };

  return (
    <MainLayout>
      <h2 className="text-3xl text-center font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">
        Login
      </h2>

      <form className="mt-3 mx-6" action="#">
        {authError && (
          <span className="flex justify-center items-center text-red-500">
            <svg
              className="stroke-current text-red-500 mr-1 w-5 h-5"
              viewBox="0 0 20 20"
            >
              <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
            </svg>
            {authError}
          </span>
        )}
        <label className="block" htmlFor="email">
          Email
        </label>
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email}</span>
        )}
        <div
          className={`shadow p-2 rounded-lg ${
            errors.email ? "border border-red-500" : ""
          }`}
        >
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 inline font-light focus:outline-none"
            type="email"
            placeholder="Email goes here"
            onChange={e => setData({ ...data, email: e.target.value })}
          />
        </div>

        <label className="block mt-3" htmlFor="password">
          Password
        </label>
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password}</span>
        )}
        <div
          className={`shadow p-2 rounded-lg ${
            errors.password ? "border border-red-500" : ""
          }`}
        >
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 font-light inline focus:outline-none"
            type="password"
            placeholder="And password here"
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </div>

        <button
          onClick={async e => await login(e)}
          className="mt-5 bg-gradient-to-r from-orange-500 to-yellow-500 font-semibold text-white rounded-xl py-2 w-full hover:opacity-75 transition-opacity"
        >
          Enter duck dimension
        </button>
      </form>

      <div className="font-light mt-5 flex justify-center cursor-pointer">
        Don't have an account?
        <Link
          to="/register"
          className="font-bold underline text-orange-500 pl-1 hover:text-orange-300 transition-colors"
        >
          Register
        </Link>
      </div>

      <Link to="/">
        <div className="font-light mt-5 flex justify-center cursor-pointer">
          <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20">
            <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
          </svg>{" "}
          Home
        </div>
      </Link>
    </MainLayout>
  );
};

export default Login;
