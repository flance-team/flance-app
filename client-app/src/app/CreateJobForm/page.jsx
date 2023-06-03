"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";

const CreateJobForm = () => {
  const base_url_server = "http://localhost:3000";
  const backgroundImage = "../assets/CreateJobForm.jpg";
  const [dataCat, setDataCat] = useState();
  const [formValue, setFormValue] = useState({
    title: "",
    location: "",
    salary: "",
    expireDate: "",
    categoryId: "",
    duration: "",
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
  const dataCategory = async () => {
    try {
      const response = await axios.get(`${base_url_server}/admins/category`);
      const dataCat = response.data.rows;
      setDataCat(dataCat);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dataCategory();
  }, []);
  return (
    <>
      <Layout />
      {/* <div
        className="h-screen w-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      > */}
      <div className="bg-white rounded-lg shadow-md">
        <h1 className="text-3xl w-full items-center">Create Job</h1>
        <form className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <div className="form-control mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control mb-4">
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary:
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                placeholder="Enter salary"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="form-control mb-4">
              <label
                htmlFor="expiredDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expired Date:
              </label>
              <input
                type="date"
                id="expiredDate"
                name="expiredDate"
                placeholder="Enter expired date"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control mb-4">
              <label
                htmlFor="typeId"
                className="block text-sm font-medium text-gray-700"
              >
                Type of Company:
              </label>
              <select
                className="select select-bordered w-full"
                id="typeId"
                name="typeId"
                onChange={inputForm}
              >
                <option defaultValue>Choose one</option>
                {dataCat?.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-control mb-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration:
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                placeholder="Enter duration"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control mb-4 flex">
              <div className="w-1/3 pr-2">
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
              <div className="w-1/3 px-2">
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
              <div className="w-1/3 pl-2">
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
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer w-full"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

export default CreateJobForm;
