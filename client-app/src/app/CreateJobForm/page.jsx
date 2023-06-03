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
    expiredDate: "",
    categoryId: "",
    duration: 0,
    day: 1,
    startHour: "",
    totalHour: 0,
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
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU3ODEwOTd9.gOZst1XQIdYcUJAEvjM-al_XJBW8GR9DGeSoXwGkTwk",
    };
    const response = await axios.post(`${base_url_server}/jobs`, formValue, {
      headers,
    });
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
  const initializeMap = () => {
    // Initialize the map and attach event listeners
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    // Add a click event listener to get the selected location
    map.addListener("click", (event) => {
      const selectedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setLocation(selectedLocation);
    });
  };

  useEffect(() => {
    dataCategory();
    // const script = document.createElement("script");
    // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBku5Hd_ABYRf5t_hmyAK6VKpGWrV_pAU0&libraries=places`;
    // script.async = true;
    // script.onload = () => {
    //   initializeMap();
    // };
    // document.body.appendChild(script);

    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);
  return (
    <>
      <Layout />
      {/* <div
        className="h-screen w-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      > */}
      <div className="bg-white rounded-lg shadow-md m-2 p-2">
        <h1 className="text-3xl w-full items-center">Create Job</h1>
        <form className="flex flex-wrap">
          <div className="md:w-1/4">
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
                placeholder="Selected Location"
                // value={location ? `${location.lat}, ${location.lng}` : ""}
                // readOnly
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
          <div className="md:w-1/4 ml-2">
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
                Type of Category:
              </label>
              <select
                className="select select-bordered w-full"
                id="typeId"
                name="categoryId"
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

              <select
                className="select select-bordered w-full"
                id="typeId"
                name="duration"
                onChange={inputForm}
              >
                <option defaultValue>Choose one</option>

                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="180">6 Months</option>
              </select>
            </div>
            <div className="form-control mb-3 flex">
              {/* <div className="w-1/3 pr-2"> */}
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700"
              >
                Day: 1
              </label>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="startHour"
                className="block text-sm font-medium text-gray-700 w-full"
              >
                Start Hour:
              </label>
              <input
                type="time"
                id="startHour"
                name="startHour"
                placeholder="Enter start hour"
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={inputForm}
              />
            </div>
            {/* <div className="w-1/3 pl-2"> */}
            <label
              htmlFor="totalHour"
              className="block text-sm font-medium text-gray-700"
            >
              Total Hour per days:
            </label>
            <input
              type="number"
              name="totalHour"
              placeholder="Enter total hour"
              className="border border-gray-300 p-2 rounded-md w-full"
              onChange={inputForm}
            />
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer w-full t-2"
              onClick={formOnSubmit}
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
