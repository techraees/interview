import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";

const Dashboard = () => {
  const [hoverEffect, setHoverEffect] = useState(false);
  return (
    <>
      <div className="w-full h-screen">
        <Header />
        <div className="flex h-full w-full">
          <div
            className={`md:w-14 w-8 bg-[#263238] transition-width duration-200 ${
              hoverEffect ? "lg:hover:w-[15rem] sm:hover:w-[12rem]" : ""
            }`}
            onMouseEnter={() => setHoverEffect(true)}
            onMouseLeave={() => setHoverEffect(false)}
          >
            <Navbar hoverEffect={hoverEffect} />
          </div>
          <div className="w-[95%] py-3 px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
