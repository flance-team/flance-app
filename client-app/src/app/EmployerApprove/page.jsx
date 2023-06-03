"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const EmployerApprove = () => {
   const base_url_server = "http://localhost:3000";
   const [users, setUsers] = useState([]);
   const getUsers = async () => {
      const { data: res } = await axios.get(`${base_url_server}/users`);
      setUsers(res);
   };
   useEffect(() => {
      getUsers();
   }, []);

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
            {JSON.stringify(users)}
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
         <div className="p-5 h-screen">
            <h1 className="text-xl mb-6 mt-2 text-black">Approval Application</h1>

            <table className="table w-auto">
               <thead className="bg-gray-500 border-b-2 border-gray-200">
                  <tr>
                     <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">No. </th>
                     <th className="p-3 text-sm font-semibold tracking-wide text-left">Users</th>
                     <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Detail</th>
                     <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {users &&
                     users.map((user) => {
                        return (
                           <tr
                              className="bg-white"
                              key={user.id}>
                              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.id}</td>
                              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.name} </td>
                              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                 <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Pending</span>
                              </td>
                              <td className="whitespace-nowrap">
                                 <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer">
                                    Approve
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

export default EmployerApprove;
