"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";

const EmployerApprove = () => {
   const params = useParams();
   const { id } = params;
   // console.log(params);
   const base_url_server = "http://localhost:3000";

   const [jobsAppliedByUsers, setJobsAppliedByUsers] = useState([]);

   const getJobsAppliedByUsers = async () => {
      // const headers = {
      //    access_token: localStorage.getItem("access_token"),
      //  };
      const headers = {
         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcEBtYWlsLmNvbSIsInJvbGUiOiJlbXBsb3llciIsImlkIjoxLCJpYXQiOjE2ODU2MjI2MjF9.mpa36-Uzhif7XpLYpuPoULPl0JAojw9SLtjytz22dT4",
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
         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcEBtYWlsLmNvbSIsInJvbGUiOiJlbXBsb3llciIsImlkIjoxLCJpYXQiOjE2ODU2MjI2MjF9.mpa36-Uzhif7XpLYpuPoULPl0JAojw9SLtjytz22dT4",
      };
      const response = await axios.patch(`${base_url_server}/jobs/offer/${id}`, { headers });
      console.log(response);
   };

   const buttonAction = (status, id) => {
      if (status === "applied") {
         return (
            <React.Fragment>
               <button
                  className="btn btn-success mr-2"
                  onClick={() => {
                     // console.log(id);
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
