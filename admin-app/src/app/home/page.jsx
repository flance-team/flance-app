"use client";
import { useEffect, useState } from "react";
import "../../styles/global.css";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import authMiddleware from "@app/middleware";

const baseUrl = "http://localhost:3000";

const HomePage = () => {
   const [dataDashboard, setDataDashboard] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getDashboardData = async () => {
         setLoading(true);
         try {
            const { data } = await axios.get(`${baseUrl}/admins/dashboard`, {
               headers: { access_token: localStorage.getItem("access_token") },
            });

            setDataDashboard(data);
         } catch (err) {
            console.log(err);
            const error = err.response.data.error;

            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: `${error}`,
            });
         } finally {
            setTimeout(() => {
               setLoading(false);
            }, 800);
         }
      };

      getDashboardData();
   }, []);

   if (loading) {
      return <Loading />;
   }

   return (
      <div className="flex">
         {/* Main Content */}
         <main className="flex-1 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Dashboard Card 1 */}
               <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center">
                     <svg
                        className="h-11 w-11 text-gray-900"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <path
                           stroke="none"
                           d="M0 0h24v24H0z"
                        />{" "}
                        <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />{" "}
                        <line
                           x1="9"
                           y1="7"
                           x2="13"
                           y2="7"
                        />{" "}
                        <line
                           x1="9"
                           y1="11"
                           x2="13"
                           y2="11"
                        />
                     </svg>
                     <h2 className="text-4xl font-semibold mb-2 ml-4">Jobs</h2>
                  </div>
                  <p>
                     <span className="text-2xl">Total : </span>
                     <span className="font-semibold text-green-500 text-4xl">{dataDashboard?.totalJobs}</span>
                  </p>
               </div>

               {/* Dashboard Card 2 */}
               <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center">
                     <svg
                        className="h-11 w-11 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                     </svg>
                     <h2 className="text-4xl font-semibold mb-2 ml-4">Users</h2>
                  </div>
                  <p>
                     <span className="text-2xl">Total : </span>
                     <span className="font-semibold text-green-500 text-4xl">{dataDashboard?.totalUsers}</span>
                  </p>
               </div>

               <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center">
                     <svg
                        className="h-11 w-11 text-gray-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                        <circle
                           cx="9"
                           cy="7"
                           r="4"
                        />{" "}
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /> <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                     </svg>
                     <h2 className="text-4xl font-semibold mb-2 ml-4">Employers</h2>
                  </div>
                  <p>
                     <span className="text-2xl">Total : </span>
                     <span className="font-semibold text-green-500 text-4xl">{dataDashboard?.totalEmployers}</span>
                  </p>
               </div>

               <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center">
                     <svg
                        className="h-11 w-11 text-gray-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <polygon points="12 2 2 7 12 12 22 7 12 2" /> <polyline points="2 17 12 22 22 17" /> <polyline points="2 12 12 17 22 12" />
                     </svg>
                     <h2 className="text-4xl font-semibold mb-2 ml-4">Categories</h2>
                  </div>
                  <p>
                     <span className="text-2xl">Total : </span>
                     <span className="font-semibold text-green-500 text-4xl">{dataDashboard?.totalCategories}</span>
                  </p>
               </div>

               <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center">
                     <svg
                        className="h-11 w-11 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                     </svg>
                     <h2 className="text-4xl font-semibold mb-2 ml-4">Types</h2>
                  </div>
                  <p>
                     <span className="text-2xl">Total : </span>
                     <span className="font-semibold text-green-500 text-4xl">{dataDashboard?.totalTypes}</span>
                  </p>
               </div>

               {/* Dashboard Card 3 */}

               <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center">
                     <svg
                        className="h-11 w-11 text-gray-900"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <path
                           stroke="none"
                           d="M0 0h24v24H0z"
                        />{" "}
                        <rect
                           x="5"
                           y="3"
                           width="14"
                           height="6"
                           rx="2"
                        />{" "}
                        <path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" />{" "}
                        <rect
                           x="10"
                           y="15"
                           width="4"
                           height="6"
                           rx="1"
                        />
                     </svg>
                     <h2 className="text-4xl font-semibold mb-2 ml-4">Skills</h2>
                  </div>
                  <p>
                     <span className="text-2xl">Total : </span>
                     <span className="font-semibold text-green-500 text-4xl">{dataDashboard?.totalSkills}</span>
                  </p>
               </div>
            </div>
         </main>
      </div>
   );
};

export default authMiddleware(HomePage);
