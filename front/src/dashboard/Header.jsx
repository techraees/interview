import React from "react";
import Logo from "/Logo.png";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between bg-[#263238] items-center py-2 md:h-14 sm:h-10 h-8">
      <div className="flex items-center md:w-14 w-8  h-full justify-center">
        <div className="w-[80%] h-[90%] flex justify-center">
          <img
            src={Logo}
            alt=""
            className="flex-1 w-full md:w-[40px] md:h-[45px] sm:w-[20px] sm:h-[25px] w-[15px] h-[20px]"
          />
        </div>
      </div>
      <div className="w-[95%] flex justify-between items-center">
        <p className="text-white font-[700] lg:text-xl lg:pl-4 sm:pl-2.5 pl-1.5 sm:text-sm text-xs">
          Membership
        </p>

        <div className="flex text-white md:gap-3 gap-1.5 items-center pr-2">
          <div className="flex flex-col justify-between">
            <p className="lg:text-xs font-[700] sm:text-[12px] xs:text-[8px] text-[5px]">
              Universal Gym
            </p>
            <p className="text-right lg:text-[10px] sm:text-[10px] xs:text-[6px] text-[4px]">
              Admin
            </p>
          </div>
          <div className="profile bg-white lg:p-1.5 sm:p-1 p-0.5">
            <FaRegUserCircle className="text-[#1fbbb4] " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
