"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerApprove = () => {
   const base_url_server = "http://localhost:3000";

   const [jobsAppliedByUsers, setJobsAppliedByUsers] = useState([]);
   const getJobsAppliedByUsers = async (id) => {
      const headers = {
         access_token: localStorage.getItem("access_token"),
      };
      const { data: res } = await axios.get(`${base_url_server}/jobs/list-applier/${id}`);
      setJobsAppliedByUsers(res);
   };
   useEffect(() => {
      getJobsAppliedByUsers();
   }, []);

   const statusAccept = async (id) => {
      const headers = {
         access_token: localStorage.getItem("access_token"),
      };
      const response = await axios.patch(`${base_url_server}/jobs/offer/${id}`);
   };

   const buttonAction = (status, id) => {
      if (status === "applied") {
         return (
            <React.Fragment>
               <button
                  className="btn btn-success mr-2"
                  onClick={() => {
                     statusAccept(id);
                  }}>
                  Accept
               </button>
            </React.Fragment>
         );
      }
   };
   useEffect(() => {
      buttonAction();
   }, [statusAccept]);

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
            {JSON.stringify(jobsAppliedByUsers)}
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
            <h1 className="text-3xl mb-6 mt-2 text-gray-600">Jobs Applied by Users</h1>

            <div className="overflow-x-auto">
               <table className="table">
                  <thead>
                     <tr>
                        <th>No.</th>
                        <th>Applier Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Applied Job</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody className="text-3xl text-black">
                     {jobsAppliedByUsers &&
                        jobsAppliedByUsers.map((jobsAppliedByUser) => {
                           return (
                              <tr key={jobsAppliedByUser.id}>
                                 <td> {jobsAppliedByUser.id} </td>
                                 <td> {jobsAppliedByUser.User.name} </td>
                                 <td> {jobsAppliedByUser.User.gender} </td>
                                 <td> {jobsAppliedByUser.User.address} </td>
                                 <td> {jobsAppliedByUser.Job.title} </td>
                                 <td> {buttonAction(jobsAppliedByUser.status, jobsAppliedByUser.id)} </td>
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

export default EmployerApprove;
