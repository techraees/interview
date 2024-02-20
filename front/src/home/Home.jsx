import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex justify-between container m-auto h-14 items-center ">
        {" "}
        <span>Welcome Back</span>
        <Link to="/dashboard">
          <button className="bg-[blue] rounded-xl text-white p-2 ">
            Go to Dashboard
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
