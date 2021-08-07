import React from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout className="text-center">
      <div className="flex flex-col">
        <span className="mt-5 font-semibold">Already have an account?</span>
        <Link to="/login">
          <button className="inline mt-1 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 font-semibold text-white rounded-3xl py-2 w-1/2">
            Login
          </button>
        </Link>
        <span className="mt-5 font-semibold">Not yet?</span>

        <Link to="/register">
          <button className="inline mt-1 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 font-semibold text-white rounded-3xl py-2 w-1/2">
            Register
          </button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;
