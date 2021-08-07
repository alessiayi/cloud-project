import React from "react";

const MainLayout = ({ className, children }) => {
  return (
    <div
      className={`bg-duck bg-right-top md:reset-bg-position min-w-screen min-h-screen flex px-3 portrait:py-4 md:p-0 ${className}`}
    >
      <div className="relative z-10 mx-auto md:ml-20 my-auto lg:w-96">
        <h2 className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
          Welcome to
        </h2>
        <h1 className="text-5xl text-center font-ducktalk bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
          DuckTalk
        </h1>
        <div className="relative bg-white rounded-xl px-3 py-8 md:w-full flex flex-col h-full md:h-3/5 justify-center">
          <div className="fade-transition">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
