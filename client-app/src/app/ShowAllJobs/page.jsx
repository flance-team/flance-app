"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const ShowAllJobs = () => {
   const base_url_server = "http://localhost:3000";
   const [jobs, setJobs] = useState([]);
   const getJobs = async () => {
      try {
         const { data: res } = await axios.get(`${base_url_server}/jobs`);
         setJobs(res);
      } catch (err) {
         console.log(err);
      }
   };
   useEffect(() => {
      getJobs();
   }, []);

   return (
      <React.Fragment>
         <Layout />
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
                  <tbody className="text-2xl">
                     {jobs &&
                        jobs.map((job) => {
                           return (
                              <tr key={job.id}>
                                 <td> {job.id} </td>
                                 <td> {job.title} </td>
                                 <td> {job.location} </td>
                                 <td> {job.salary} </td>
                                 <td> {new Date(job.expireDate).toISOString().substring(0, 10)} </td>
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
