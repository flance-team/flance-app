"use client";
import React, { useState, useEffect } from "react";
const baseUrl = "http://localhost:3000";
import axios from "axios";
import Swal from "sweetalert2";

const CreateJobForm = ({ onCreateJob, onClose }) => {
  const initialFormState = {
    title: "",
    location: "",
    salary: "",
    expireDate: "",
    categoryId: 1,
    duration: 7,
    schedules: [{ day: "", startHour: "", totalHour: "" }],
  };
  const [createJobForm, setCreateJobForm] = useState(initialFormState);
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/admins/category`);
        setDataCategory(data.rows);
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const schedules = [...createJobForm.schedules];
    schedules[index][name] = value;
    setCreateJobForm({ ...createJobForm, schedules });
  };

  const handleAddSchedule = () => {
    const schedules = [
      ...createJobForm.schedules,
      { day: "", startHour: "", totalHour: "" },
    ];
    setCreateJobForm({ ...createJobForm, schedules });
  };

  const handleRemoveSchedule = (index) => {
    const schedules = [...createJobForm.schedules];
    schedules.splice(index, 1);
    setCreateJobForm({ ...createJobForm, schedules });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !createJobForm.title ||
      !createJobForm.location ||
      !createJobForm.salary ||
      !createJobForm.expireDate ||
      !createJobForm.categoryId ||
      !createJobForm.duration
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please fill all the fields`,
      });
    } else {
      onCreateJob(createJobForm);
      setCreateJobForm(initialFormState);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="fixed inset-0 bg-gray-500 opacity-75"
        onClick={onClose}
      ></div>
      <div className="absolute bg-white w-6/12 p-6 rounded-lg shadow-lg z-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Create New Job
          </h2>
          <button
            className="block rounded-md bg-gray-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 m-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={createJobForm.title}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, title: e.target.value })
              }
              required
              placeholder="Job Title"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={createJobForm.location}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, location: e.target.value })
              }
              required
              placeholder="Job Location"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Rate per hour
            </label>
            <input
              type="number"
              name="salary"
              value={createJobForm.salary}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, salary: e.target.value })
              }
              required
              placeholder="Rate per hour"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Job Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              value={createJobForm.expireDate}
              onChange={(e) =>
                setCreateJobForm({
                  ...createJobForm,
                  expireDate: e.target.value,
                })
              }
              placeholder="Job Expire Date"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Category ID
            </label>
            <select
              name="categoryId"
              value={createJobForm.categoryId}
              onChange={(e) =>
                setCreateJobForm({
                  ...createJobForm,
                  categoryId: e.target.value,
                })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {dataCategory?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Duration
            </label>
            <select
              name="duration"
              value={createJobForm.duration}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, duration: e.target.value })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="7">1 Week</option>
              <option value="30">1 Month</option>
              <option value="180">6 Months</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Schedules
            </label>
            {createJobForm.schedules.map((schedule, index) => (
              <div key={index} className="flex space-x-2">
                <select
                  name="day"
                  value={schedule.day}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  className="w-1/3 border rounded-md px-3 py-2 mb-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Day</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                  <option value="7">Sunday</option>
                </select>
                <input
                  type="time"
                  name="startHour"
                  value={schedule.startHour}
                  placeholder="Start Hour"
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  className="w-1/3 border rounded-md px-3 py-2 mb-2 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <input
                  type="number"
                  name="totalHour"
                  value={schedule.totalHour}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Total Hours"
                  required
                  className="w-1/3 border rounded-md px-3 py-2 mb-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 m-2 mb-2 ml-2"
                    onClick={() => handleRemoveSchedule(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 m-2"
              onClick={handleAddSchedule}
            >
              Add Schedule
            </button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-2"
            >
              Create
            </button>
            <button
              type="button"
              className="rounded-md bg-red-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 m-2 ml-2"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
