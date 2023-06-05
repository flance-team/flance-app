"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const ShowAllJobs = () => {
   const base_url_server = "http://localhost:3000";
   const [jobs, setJobs] = useState([]);
   const getJobs = async () => {
      const { data: res } = await axios.get(`${base_url_server}/jobs`);
      setJobs(res);
   };
   useEffect(() => {
      getJobs();
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
            <h1 className="text-3xl mb-6 mt-2 text-gray-600">All Jobs</h1>

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
                     </tr>
                  </thead>
                  <tbody className="text-3xl">
                     {jobs &&
                        jobs.map((job) => {
                           return (
                              <tr key={job.id}>
                                 <td> {job.id} </td>
                                 <td> {job.title} </td>
                                 <td> {job.location} </td>
                                 <td> {job.salary} </td>
                                 <td> {job.expireDate} </td>
                                 <td> {job.status} </td>
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

export default ShowAllJobs;
