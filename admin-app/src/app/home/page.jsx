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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-5xl font-semibold mb-2">Jobs</h2>
            <p>
              <span className="text-2xl">Total : </span>
              <span className="font-semibold text-green-500 text-4xl">
                {dataDashboard?.totalJobs}
              </span>
            </p>
          </div>

          {/* Dashboard Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-5xl font-semibold mb-2">Users</h2>
            <p>
              <span className="text-2xl">Total : </span>
              <span className="font-semibold text-green-500 text-4xl">
                {dataDashboard?.totalUsers}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-5xl font-semibold mb-2">Employers</h2>
            <p>
              <span className="text-2xl">Total : </span>
              <span className="font-semibold text-green-500 text-4xl">
                {dataDashboard?.totalEmployers}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-5xl font-semibold mb-2">Categories</h2>
            <p>
              <span className="text-2xl">Total : </span>
              <span className="font-semibold text-green-500 text-4xl">
                {dataDashboard?.totalCategories}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-5xl font-semibold mb-2">Skills</h2>
            <p>
              <span className="text-2xl">Total : </span>
              <span className="font-semibold text-green-500 text-4xl">
                {dataDashboard?.totalSkills}
              </span>
            </p>
          </div>

          {/* Dashboard Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-5xl font-semibold mb-2">Types</h2>
            <p>
              <span className="text-2xl">Total : </span>
              <span className="font-semibold text-green-500 text-4xl">
                {dataDashboard?.totalTypes}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default authMiddleware(HomePage);
