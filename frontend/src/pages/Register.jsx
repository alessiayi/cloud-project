import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <MainLayout>
      <h2 className="text-3xl text-center font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">
        Register
      </h2>

      {isRegistered ? (
        <div className="text-center my-3 font-light fade-transition">
          <h4 className="text-lg">Congratulations! You have been registered</h4>
          <p>
            Now you can
            <Link
              to="/login"
              className="font-bold underline text-orange-500 pl-1 hover:text-orange-300 transition-colors"
            >
              log in
            </Link>
            .
          </p>
        </div>
      ) : (
        <RegisterForm onRegistered={() => setIsRegistered(true)} />
      )}

      <Link to="/">
        <div className="font-light mt-1 flex justify-center cursor-pointer">
          <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20">
            <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
          </svg>{" "}
          Home
        </div>
      </Link>
    </MainLayout>
  );
};

export default Register;
