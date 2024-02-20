import React, { useState } from "react";
import axios from "axios";

let REACT_APP_API_ROUTE = "http://localhost:3000/api";

const MemberShipFormData = ({
  formState: {
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
  },
}) => {
  // Handle Form Submission

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    setSubmitted(false); // Reset submitted state when any field is changed
    validateField(id, value);
  };

  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };
    if (value.trim() === "" && fieldName != "price") {
      errors[fieldName] = `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required`;
    } else if (value.trim().length < 5 && fieldName != "price") {
      errors[fieldName] = `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } has more than 4 char`;
    } else if (fieldName == "price") {
      if (value.trim() === "") {
        errors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
      } else if (Number(value) < 0) {
        errors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } cannot be negative`;
      } else {
        delete errors[fieldName];
      }
    } else {
      delete errors[fieldName];
    }
    setFormErrors(errors);
    setSubmitDisabled(Object.keys(errors).length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    console.log(Object.keys(formData));
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });
    setFormErrors(errors);
    setSubmitted(true); // Set submitted state to true when form is submitted
    setSubmitDisabled(Object.keys(errors).length > 0);
    if (Object.keys(errors).length === 0) {
      // Handle form submission here
      try {
        const updatedata = {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          durationStart: formData.durationStart,
          durationEnd: formData.durationEnd,
        };
        const res = await axios.put(
          `${REACT_APP_API_ROUTE}/membership/${formData.id}`,
          {
            ...updatedata,
          }
        );
        console.log(res);
      
        setActiveForm(false);
        setFormData((prev) => ({
          ...prev,
          name: "",
          price: "",
          durationStart: "",
          durationEnd: "",
          description: "",
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className={`w-[95%] pt-4 m-auto relative  ${
        activeFrom ? "block" : "hidden"
      }`}
      onSubmit={handleSubmit}
      style={{ animation: "myAnim 0.3s ease 0s 1 normal forwards" }}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-4 grid-cols-1">
        <div>
          <label
            htmlFor="name-type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 lg:text-sm text-[10px] rounded-lg focus:border-[#263238] block w-full lg:p-2 md:p-1.5 p-1"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
          {(submitted || formErrors.name) && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>{" "}
        <div>
          <label
            htmlFor="durationStart"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Duration Start
          </label>
          <input
            type="date"
            id="durationStart"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 lg:text-sm text-[10px] rounded-lg focus:border-[#263238] block w-full lg:p-2 md:p-1.5 p-1"
            placeholder="Enter duration"
            value={formData.durationStart}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
          {(submitted || formErrors.durationStart) && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.durationStart}
            </p>
          )}
        </div>{" "}
        <div>
          <label
            htmlFor="durationEnd"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Duration End
          </label>
          <input
            type="date"
            id="durationEnd"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 lg:text-sm text-[10px] rounded-lg focus:border-[#263238] block w-full lg:p-2 md:p-1.5 p-1"
            placeholder="Enter duration"
            value={formData.durationEnd}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
          {(submitted || formErrors.durationEnd) && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.durationEnd}
            </p>
          )}
        </div>{" "}
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 lg:text-sm text-[10px] rounded-lg focus:border-[#263238] block w-full lg:p-2 md:p-1.5 p-1"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
          />
          {(submitted || formErrors.price) && (
            <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
          )}
        </div>{" "}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 lg:text-sm text-[10px] rounded-lg focus:border-[#263238] block w-full lg:p-2 md:p-1.5 p-1"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
          />
          {(submitted || formErrors.description) && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.description}
            </p>
          )}
        </div>
      </div>
      <div className="w-full text-right">
        <button
          type="submit"
          class={`text-white focus:ring-2 focus:outline-none focus:ring-[#b3b3b3] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center ${
            submitDisabled
              ? "bg-[#7f878b] cursor-not-allowed"
              : " bg-[#36474f]  cursor-pointer  hover:bg-[#263238]"
          }`}
          disabled={submitDisabled}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default MemberShipFormData;
