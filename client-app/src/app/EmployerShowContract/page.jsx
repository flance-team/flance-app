"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerShowContract = () => {
   const base_url_server = "http://localhost:3000";

   const [contracts, setContracts] = useState([]);
   const getContracts = async () => {
      // const headers = {
      //    access_token: localStorage.getItem("access_token"),
      //  };
      const headers = {
         "Content-Type": "application/json",
         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU3ODEwOTd9.gOZst1XQIdYcUJAEvjM-al_XJBW8GR9DGeSoXwGkTwk",
      };
      const { data: res } = await axios.get(`${base_url_server}/jobs/list-employee`, { headers });
      setContracts(res);
   };
   useEffect(() => {
      getContracts();
   }, []);

   return (
      <React.Fragment>
         <Layout />
         <div className="p-5 h-screen bg-gray-100">
            <h1 className="text-3xl mb-6 mt-2 text-gray-600">Employer Show Contract</h1>

            <div className="overflow-x-auto">
               <table className="table">
                  <thead>
                     <tr>
                        <th>No.</th>
                        <th>Applier Name</th>
                        <th>Title</th>
                        <th>Timestamp</th>
                        <th>End Date</th>
                        <th>Total Hours</th>
                        <th>Total Salary</th>
                     </tr>
                  </thead>
                  <tbody className="text-2xl">
                     {contracts &&
                        contracts.map((contract) => {
                           return (
                              <tr key={contract.id}>
                                 <td> {contract.id} </td>
                                 <td> {contract.Job.title} </td>
                                 <td> {contract.User.name} </td>
                                 <td> {contract.timestamp} </td>
                                 <td> {contract.endDate} </td>
                                 <td> {contract.totalHours} </td>
                                 <td> {contract.totalSalary} </td>
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

export default EmployerShowContract;
