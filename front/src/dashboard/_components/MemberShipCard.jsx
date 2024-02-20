import axios from "axios";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

let REACT_APP_API_ROUTE = "http://localhost:3000/api";

const MemberShipCard = ({
  data,
  index,
  handleData: {
    membershipData,
    setMembershipData,
    setActiveForm,
    setUpdateActiveForm,
    updateActiveForm,
    setFormData,
  },
}) => {
  // Handle Date
  const formatDateDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    // If the difference is less than a month, show only days
    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }

    // Otherwise, calculate years, months, and remaining days
    const diffYears = Math.floor(diffDays / 365);
    const diffMonths = Math.floor((diffDays % 365) / 30);
    const remainingDays = diffDays % 30;

    let result = "";
    if (diffYears > 0) {
      result += `${diffYears} year${diffYears !== 1 ? "s" : ""} `;
    }
    if (diffMonths > 0) {
      result += `${diffMonths} month${diffMonths !== 1 ? "s" : ""} `;
    }
    if (remainingDays > 0) {
      result += `${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
    }

    return result.trim();
  };
  // END Handle Date

  // Handle Remove
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`${REACT_APP_API_ROUTE}/membership/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // END Handle Remove

  // Handle Update Data
  // END Handle Update Data
  const [activeMember, setActiveMember] = useState(false);
  return (
    <div className="flex justify-between bg-[#e6edee] items-center p-2 w-full w-[100%] h-[90px] sm:w-[250px] md:w-[300px] lg:w-[325px] 2xl:w-[400px]">
      <div>
        <p className="font-[700]">{data && data.name}</p>
        <div className="flex flex-col gap-2.5">
          <p className="">
            Duration:{" "}
            {data && formatDateDifference(data.durationStart, data.durationEnd)}
          </p>
          <p className="text-sm">{data && data.price.toLocaleString()}</p>
        </div>
      </div>
      <div
        className="cursor-pointer relative"
        onClick={() => {
          setActiveMember(!activeMember);
        }}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute top-[1.5rem] right-[0.5rem] bg-white drop-shadow-xl text-sm flex flex-col gap-1 top-0 ${
            activeMember ? "block" : "hidden"
          }`}
        >
          <p
            className="p-3 pr-3 pb-0 text-left hover:bg-[#e9e9e9]"
            onClick={() => {
              setActiveForm(false);
              setUpdateActiveForm(!updateActiveForm);
              setFormData((prev) => ({
                ...prev,
                id: data._id,
                name: data.name,
                price: data.price,
                description: data.description,
                durationStart: data.durationStart.substring(0, 10),
                durationEnd: data.durationEnd.substring(0, 10),
              }));
            }}
          >
            Edit
          </p>
          <p
            className="p-3 pr-3 text-left hover:bg-[#e9e9e9]"
            onClick={() => handleRemove(data && data._id)}
          >
            Trash
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberShipCard;
