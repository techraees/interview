import React, { useEffect, useState } from "react";
import "./membership.css";
import axios from "axios";
import MemberShipFormDataCreate from "./MemberShipFormDataCreate";
import MemberShipFormDataUpdate from "./MemberShipFormDataUpdate";
import MemberShipCard from "./MemberShipCard";

let REACT_APP_API_ROUTE = "http://localhost:3000/api";

const MemberShip = () => {
  const dummyData = [
    { name: "Monthly", duration: "1 year", price: "Rs 5,000" },
    { name: "Monthly", duration: "6 months", price: "Rs 3,000" },
    { name: "Monthly", duration: "3 months", price: "Rs 2,000" },
    { name: "Monthly", duration: "1 month", price: "Rs 1,000" },
    { name: "Monthly", duration: "2 years", price: "Rs 8,000" },
    { name: "Monthly", duration: "1 year", price: "Rs 4,000" },
    { name: "Monthly", duration: "6 months", price: "Rs 2,500" },
    { name: "Monthly", duration: "3 months", price: "Rs 1,500" },
    { name: "Monthly", duration: "1 month", price: "Rs 800" },
    { name: "Monthly", duration: "3 years", price: "Rs 12,000" },
  ];

  // Handle Get Data
  const [membershipData, setMembershipData] = useState([]);

  const handleGetMemberShips = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_ROUTE}/membership/`, {
        ...formData,
      });
      if (res.data) {
        setMembershipData(res.data.memberShip);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMemberShips();
  }, [membershipData]);
  // END Handle Get Data

  // Handle Form Data
  const [formData, setFormData] = useState({
    name: "",
    durationStart: "",
    durationEnd: "",
    price: "",
    description: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    name: "",
    durationStart: "",
    durationEnd: "",
    price: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [activeFrom, setActiveForm] = useState(false);
  const [updateActiveForm, setUpdateActiveForm] = useState(false);

  // Handle Form Data

  return (
    <div className="flex  flex-col border shadow-md">
      <div
        onClick={() => {
          setActiveForm(!activeFrom);
          setUpdateActiveForm(false);
          setFormData((prev) => ({
            ...prev,
            name: "",
            price: "",
            durationEnd: "",
            durationStart: "",
            description: "",
          }));
          setFormErrors({});
          setSubmitDisabled(false);
        }}
        className="flex justify-between items-center lg:h-[75px] sm:h-[50px] h-[35px] bg-[#e6edee] w-full lg:px-5 px-2 cursor-pointer"
      >
        <p className="lg:font-[700] lg:text-2xl  font-[700] sm:text-lg text-[10px]">
          Memberships
        </p>

        <div className="flex w-fit items-center  bg-[#414f56] hover:bg-[#263238] text-nowrap lg:w-[175px] md:w-[125px] sm:w-[100px] w-[50px] lg:h-[35px] md:h-[30px] sm:h-[25px] xs:h-[15px] h-[12px] w-[55px]">
          <p className="w-[80%] font-sm flex items-center justify-center text-white lg:text-[1.25rem] md:text-[0.85rem]  sm:text-xs text-[5px] sm:px-1.5 text-center font-[500] px-1 ">
            Create Plan
          </p>
          <span className="w-[20%] bg-[#3362cc] flex justify-center items-center text-white h-full lg:text-[1.75rem] sm:text-lg text-[7px]">
            +
          </span>
        </div>
      </div>

      <MemberShipFormDataCreate
        formState={{
          activeFrom,
          setActiveForm,
          formData,
          setFormData,
          formErrors,
          setFormErrors,
          submitted,
          setSubmitted,
          submitDisabled,
          setSubmitDisabled,
          setMembershipData,
        }}
      />
      <MemberShipFormDataUpdate
        formState={{
          activeFrom: updateActiveForm,
          setActiveForm: setUpdateActiveForm,
          formData: updateFormData,
          setFormData: setUpdateFormData,
          formErrors,
          setFormErrors,
          submitted,
          setSubmitted,
          submitDisabled,
          setSubmitDisabled,
          setMembershipData,
        }}
      />
      <div className="plan p-5 ">
        <p className="font-[700] text-2xl p-3">Plans</p>
        <div className="flex flex-col sm:flex-row gap-5 flex-wrap">
          {membershipData ? (
            membershipData.map((item, i) => {
              return (
                <MemberShipCard
                  key={i}
                  index={i}
                  data={item}
                  handleData={{
                    membershipData,
                    setMembershipData,
                    setActiveForm,
                    setUpdateActiveForm,
                    updateActiveForm,
                    setFormData: setUpdateFormData,
                  }}
                />
              );
            })
          ) : (
            <p>There is no data yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberShip;
