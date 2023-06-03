"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerShowJobs = () => {
   const base_url_server = "http://localhost:3000";
   const [createdJobs, setCreatedJobs] = useState([]);
   const getCreatedJobs = async () => {
      const headers = {
         access_token: localStorage.getItem("access_token"),
      };
      const { data: res } = await axios.get(`${base_url_server}/jobs/list`);
      setCreatedJobs(res);
   };
   useEffect(() => {
      getCreatedJobs();
   }, []);

   return (
      <React.Fragment>
         <div className="flex space-x-4">
            <div className="flex-1 text-black ml-7 mt-4">
               <img
                  // src="/Logo.png"
                  alt="Logo"
                  width="48"
                  height="48"
               />
            </div>
            {JSON.stringify(createdJobs)}
            <div className="flex-1 text-white flex justify-end items-center">
               <div className="dropdown dropdown-end mt-4 mr-8">
                  <label
                     tabIndex="0"
                     className="btn btn-ghost btn-circle avatar">
                     <div className="w-10 rounded-full">
                        <img
                        // src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
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
         <div className="p-5 h-screen bg-gray-100">
            <h1 className="text-3xl mb-6 mt-2 text-gray-600">Your Created Jobs</h1>

            <div className="overflow-x-auto">
               <table className="table">
                  <thead>
                     <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Expired Date</th>
                        <th>Status</th>
                        <th>Total Hours</th>
                        <th>Duration</th>
                     </tr>
                  </thead>
                  <tbody className="text-3xl text-black">
                     {createdJobs &&
                        createdJobs.map((createdJob) => {
                           return (
                              <tr key={createdJob.id}>
                                 <td> {createdJob.id} </td>
                                 <td> {createdJob.title} </td>
                                 <td> {createdJob.location} </td>
                                 <td> {createdJob.salary} </td>
                                 <td> {createdJob.expireDate} </td>
                                 <td> {createdJob.status} </td>
                                 <td> {createdJob.totalHours} </td>
                                 <td> {createdJob.duration} </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
            </div>
         </div>
      </React.Fragment>
   );
};

export default EmployerShowJobs;
