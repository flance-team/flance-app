"use client";
//signup User
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
const base_url_server = "http://localhost:3000";

const AdminHome = () => {
   return (
      <React.Fragment>
         <div className="flex space-x-4 my-3">
            <div className="flex-1 text-black ml-2">
               <img
                  src="../assets/logo.png"
                  alt="me"
                  width="64"
                  height="64"
               />
            </div>
            <div className="flex-1 text-black flex justify-end items-center">
               <div className="dropdown dropdown-end">
                  <label
                     tabIndex="0"
                     className="btn btn-ghost btn-circle avatar">
                     <div className="w-10 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                     </div>
                  </label>
                  <ul
                     tabIndex="0"
                     className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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
      </React.Fragment>
   );
};

export default AdminHome;
