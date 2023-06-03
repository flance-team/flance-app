"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerShowJobs = () => {
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
         <hr className="mt-4"></hr>
         <div className="container w-full px-4 mt-4 flex flex-col w-5/12">
            <h1 className="text-5xl font-bold text-gray-600 mb-2">Your Created Jobs</h1>
            <hr className="mb-4 mt-4"></hr>
            <table className="table-auto">
               <thead className="text-4xl font-bold text-gray-600">
                  <tr>
                     <th>No. </th>
                     <th>Job Title</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody className="text-3xl text-black">
                  {jobs &&
                     jobs.map((job) => {
                        return (
                           <tr key={job.id}>
                              <td> {job.id}</td>
                              <td> {job.title} </td>
                              <td>
                                 <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">
                                    Detail
                                 </button>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      </React.Fragment>
   );
};

export default EmployerShowJobs;
