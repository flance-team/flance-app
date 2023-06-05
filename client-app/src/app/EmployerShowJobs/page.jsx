"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerShowJobs = () => {
   const base_url_server = "http://localhost:3000";
   const [createdJobs, setCreatedJobs] = useState([]);
   const getCreatedJobs = async () => {
      try {
         // const headers = {
         //    access_token: localStorage.getItem("access_token"),
         //  };
         const headers = {
            "Content-Type": "application/json",
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU3ODEwOTd9.gOZst1XQIdYcUJAEvjM-al_XJBW8GR9DGeSoXwGkTwk",
         };
         const { data: res } = await axios.get(`${base_url_server}/jobs/list`, { headers });
         setCreatedJobs(res);
      } catch (err) {
         console.log(err);
      }
   };
   useEffect(() => {
      getCreatedJobs();
   }, []);

   return (
      <React.Fragment>
         <Layout />
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
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody className="text-2xl">
                     {createdJobs &&
                        createdJobs.map((createdJob) => {
                           return (
                              <tr key={createdJob.id}>
                                 <td> {createdJob.id} </td>
                                 <td> {createdJob.title} </td>
                                 <td> {createdJob.location} </td>
                                 <td> {createdJob.salary} </td>
                                 <td> {new Date(createdJob.expireDate).toISOString().substring(0, 10)} </td>
                                 <td> {createdJob.status} </td>
                                 <td> {createdJob.totalHours} </td>
                                 <td> {createdJob.duration} </td>
                                 <td>
                                    <Link href={`/EmployerApprove/${createdJob.id}`}>Detail</Link>
                                 </td>
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
