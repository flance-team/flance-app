"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
const CreateJobForm = () => {
  const backgroundImage = "../assets/CreateJobForm.jpg";
  const [formValue, setFormValue] = useState({
    day: "",
    hour: "",
    totalhour: "",
  });
  const inputForm = (el) => {
    setFormValue({
      ...formValue,
      [el.target.name]: el.target.value,
    });
  };
  const formOnSubmit = async (el) => {
    el.preventDefault();
    // const response = JSON.stringify(formValue);
    // console.log(response, "ini response");
    // const response = await axios.post("http://localhost:3000/login", formValue);
    console.log(response);
  };
  return (
    <>
      <Layout />
      <div
        className="h-screen w-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl mb-4">Add Schedule</h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700"
              >
                Day:
              </label>
              <input
                type="text"
                id="day"
                name="day"
                placeholder="Enter day"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="startHour"
                className="block text-sm font-medium text-gray-700"
              >
                Start Hour:
              </label>
              <input
                type="text"
                id="startHour"
                name="startHour"
                placeholder="Enter start hour"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="totalHour"
                className="block text-sm font-medium text-gray-700"
              >
                Total Hour:
              </label>
              <input
                type="text"
                id="totalHour"
                name="totalHour"
                placeholder="Enter total hour"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateJobForm;
