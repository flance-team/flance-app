"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CreateJobForm.css";

const CreateJobForm = () => {
   return (
      <React.Fragment>
         <div className="flex space-x-4">
            <div className="flex-1 text-black ml-7 mt-4">
               <img
                  src="/Logo.png"
                  alt="me"
                  width="48"
                  height="48"
               />
            </div>
            <div className="flex-1 text-white flex justify-end items-center">
               <div className="dropdown dropdown-end mt-4 mr-8">
                  <label
                     tabIndex="0"
                     className="btn btn-ghost btn-circle avatar">
                     <div className="w-10 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                     </div>
                  </label>
                  <ul
                     tabIndex="0"
                     className="mt-4 p-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                     <li>
                        <a className="justify-between">Home</a>
                     </li>
                     <li>
                        <a className="justify-between">Profile</a>
                     </li>
                     <li>
                        <a>Settings</a>
                     </li>
                     <li>
                        <a>Logout</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <hr className="mt-4"></hr>
         <div
            class="container"
            className="flex flex-col justify-center items-center w-5/12">
            <div className="text-center mb-5">
               <h1 className="text-3xl font-bold text-gray-600 mb-4">Create New Job</h1>
            </div>
            <form className="flex flex-col justify-center">
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Job Title:</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Type here"
                     name="job-title"
                     className="input input-bordered py-3 mb-2"
                  />
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">ID Employee:</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Type here"
                     name="id-employee"
                     className="input input-bordered py-3 mb-2"
                  />
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Location:</span>
                  </label>
                  <select
                     className="select select-bordered"
                     name="location">
                     <option defaultValue="old-location">Current Location</option>
                     <option value="new-location">New Location</option>
                  </select>
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Add New Location (Optional):</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Type here"
                     name="add-location"
                     className="input input-bordered py-3 mb-2"
                  />
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Salary Per Hour:</span>
                  </label>
                  <input
                     type="number"
                     placeholder="Type here"
                     name="salary"
                     className="input input-bordered py-3 mb-2"
                  />
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Expired Date:</span>
                  </label>
                  <input
                     type="date"
                     placeholder="Type here"
                     name="expired-date"
                     className="input input-bordered py-3 mb-2"
                  />
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Status:</span>
                  </label>
                  <select
                     className="select select-bordered mb-2"
                     name="status">
                     <option defaultValue="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </select>
               </div>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-gray-600">Duration:</span>
                  </label>
                  <select
                     className="select select-bordered mb-6"
                     name="status">
                     <option defaultValue="weekly">Weekly</option>
                     <option value="monthly">Monthly</option>
                  </select>
               </div>
               <div className="justify-center items-center">
                  <button className="btn btn-outline bg-gray-600 justify-center items-center py-2 px-4 ">Create</button>
               </div>
            </form>
         </div>
      </React.Fragment>
   );
};

export default CreateJobForm;
