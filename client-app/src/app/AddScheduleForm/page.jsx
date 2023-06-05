"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddScheduleForm = () => {
<<<<<<< HEAD
  return (
    <React.Fragment>
      <div className="navbar">
        <div className="navbar-logo">
          <img src="../assets/logo.png" alt="Logo" />
          <span>Logo</span>
        </div>
        <ul className="navbar-menu">
          <li>
            <a href="#">Menu 1</a>
          </li>
          <li>
            <a href="#">Menu 2</a>
          </li>
          <li>
            <a href="#">Menu 3</a>
          </li>
        </ul>
      </div>
      <div className="container">
        <h1>Add Schedule</h1>
        <form>
          <div className="form-group">
            <label htmlFor="day">Day:</label>
            <input type="text" id="day" name="day" placeholder="Enter day" />
          </div>
          <div className="form-group">
            <label htmlFor="startHour">Start Hour:</label>
            <input
              type="text"
              id="startHour"
              name="startHour"
              placeholder="Enter start hour"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalHour">Total Hour:</label>
            <input
              type="text"
              id="totalHour"
              name="totalHour"
              placeholder="Enter total hour"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </React.Fragment>
  );
};

// module.exports = AddScheduleForm;
=======
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
               <h1 className="text-3xl font-bold text-gray-600 mb-4">Add Schedule</h1>
            </div>
            <form className="flex flex-col justify-center">
               <div className="form-control">
                  <label
                     htmlFor="day"
                     className="label text-gray-600">
                     Day:
                  </label>
                  <input
                     type="text"
                     id="day"
                     placeholder="Type here"
                     name="day"
                     className="input input-bordered py-3"
                  />
               </div>
               <div className="form-control">
                  <label
                     htmlFor="start-hour"
                     className="label text-gray-600">
                     Start Hour:
                  </label>
                  <input
                     type="text"
                     id="start-hour"
                     placeholder="Type here"
                     name="start-hour"
                     className="input input-bordered py-3"
                  />
               </div>
               <div className="form-control">
                  <label
                     htmlFor="total-hour"
                     className="label text-gray-600">
                     Total Hour:
                  </label>
                  <input
                     type="text"
                     id="total-hour"
                     placeholder="Type here"
                     name="total-hour"
                     className="input input-bordered py-3 mb-4"
                  />
               </div>
               <div className="justify-center items-center">
                  <button className="btn btn-outline bg-gray-600 justify-center items-center py-2 px-4 ">Add</button>
               </div>
            </form>
         </div>
      </React.Fragment>
   );
};

>>>>>>> 331126a5fbf90e10e60111d485dac2e4650a607e
export default AddScheduleForm;
