"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerApprove = () => {
   const base_url_server = "http://localhost:3000";

   const [jobsAppliedByUsers, setJobsAppliedByUsers] = useState([]);

   const getJobsAppliedByUsers = async (id) => {
      // const headers = {
      //    access_token: localStorage.getItem("access_token"),
      //  };
      const headers = {
         "Content-Type": "application/json",
         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU3ODEwOTd9.gOZst1XQIdYcUJAEvjM-al_XJBW8GR9DGeSoXwGkTwk",
      };
      const { data: res } = await axios.get(`${base_url_server}/jobs/list-applier/${id}`, { headers });
      setJobsAppliedByUsers(res);
   };
   useEffect(() => {
      getJobsAppliedByUsers();
   }, []);

   const statusAccept = async (id) => {
      // const headers = {
      //    access_token: localStorage.getItem("access_token"),
      //  };
      const headers = {
         "Content-Type": "application/json",
         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU3ODEwOTd9.gOZst1XQIdYcUJAEvjM-al_XJBW8GR9DGeSoXwGkTwk",
      };
      const response = await axios.patch(`${base_url_server}/jobs/offer/${id}`, { headers });
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
         <Layout />
         {JSON.stringify(jobsAppliedByUsers)}
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
                  <tbody className="text-2xl">
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
