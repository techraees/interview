import React from "react";
import Profile from "/profile.png";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoDocumentLockOutline,
  IoPrintOutline,
} from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = ({ hoverEffect }) => {
  const location = useLocation();
  const navLinks = [
    {
      imgURL: (
        <IoHomeOutline className="md:w-[16px] md:h-[16px] xs:w-[14px] xs:h-[100px] w-[8px] h-[8px]" />
      ),
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      imgURL: (
        <IoDocumentLockOutline className="md:w-[16px] md:h-[16px]  xs:w-[14px] xs:h-[100px] w-[8px] h-[8px]" />
      ),
      text: "MemberShips",
      path: "/dashboard/membership",
    },
    {
      imgURL: (
        <GrUserSettings className="md:w-[16px] md:h-[16px] xs:w-[14px] xs:h-[100px] w-[8px] h-[8px]" />
      ),
      text: "Contact",
      path: "/dashboard/contact",
    },
    {
      imgURL: (
        <IoPrintOutline className="md:w-[16px] md:h-[16px] xs:w-[14px] xs:h-[100px] w-[8px] h-[8px]" />
      ),
      text: "Print",
      path: "/dashboard/printpage",
    },
    {
      imgURL: (
        <IoIosNotificationsOutline className="md:w-[16px] md:h-[16px] xs:w-[14px] xs:h-[100px] w-[8px] h-[8px]" />
      ),
      text: "Notification",
      path: "/dashboard/notification",
    },
  ];
  return (
    <nav>
      <ul className="md:gap-5 gap-1 md:p-3 p-1 flex flex-col">
        {navLinks.map((item, i) => {
          return (
            <Element
              key={i}
              data={{
                imgURL: item.imgURL,
                text: item.text,
                path: item.path,
                hoverEffect,
              }}
            />
          );
        })}
      </ul>
    </nav>
  );
};

const Element = ({ data: { imgURL, text, hoverEffect, path } }) => {
  return (
    <Link
      to={path}
      className={`liststyle flex items-center text-white gap-3 w-full ${
        !hoverEffect ? "lg:justify-center" : "lg:justify-start  rounded-lg"
      } transition-all duration-100 ease-in-out`}
    >
      <li
        className={`md:w-[32px] md:h-[32px] w-[16px] h-16px flex  items-center p-1.5  flex-1 lg:gap-3 gap-2  rounded-full  ${
          !hoverEffect
            ? "justify-center"
            : "sm:justify-start justify-center sm:pl-[1rem] "
        }  ${
          location.pathname === path && "bg-white text-[black] rounded-full"
        }`}
      >
        {imgURL}
        <p
          className={` ${
            !hoverEffect ? "hidden" : "sm:block hidden"
          }  sm:text-xs lg:text-[1rem]`}
        >
          {text}
        </p>
      </li>
    </Link>
  );
};

export default Navbar;
