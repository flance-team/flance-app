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
    schedules: [{ day: "", startHour: "", totalHour: 0 }],
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
          <h2 className="text-2xl font-semibold">Create New Job</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={createJobForm.title}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, title: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={createJobForm.location}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, location: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Salary per hour</label>
            <input
              type="number"
              name="salary"
              value={createJobForm.salary}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, salary: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Job Expire Date</label>
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
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Category ID</label>
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
              className="w-full border rounded-md px-3 py-2"
            >
              {dataCategory?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Duration</label>
            <select
              name="duration"
              value={createJobForm.duration}
              onChange={(e) =>
                setCreateJobForm({ ...createJobForm, duration: e.target.value })
              }
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="7">1 Week</option>
              <option value="30">1 Month</option>
              <option value="180">6 Months</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Schedules</label>
            {createJobForm.schedules.map((schedule, index) => (
              <div key={index} className="flex space-x-2">
                <select
                  name="day"
                  value={schedule.day}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                  className="w-1/3 border rounded-md px-3 py-2 mb-2"
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
                  className="w-1/3 border rounded-md px-3 py-2 mb-2"
                />
                <input
                  type="number"
                  name="totalHour"
                  value={schedule.totalHour}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Total Hours"
                  required
                  className="w-1/3 border rounded-md px-3 py-2 mb-2"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-error mb-2 ml-2"
                    onClick={() => handleRemoveSchedule(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleAddSchedule}
            >
              Add Schedule
            </button>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button
              type="button"
              className="btn btn-error ml-2"
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
