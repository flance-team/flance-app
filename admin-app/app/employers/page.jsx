"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import "../../styles/global.css";
import BadgeInput from "../../components/BadgeInput";

const baseUrl = "http://localhost:3000";

const page = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/employers`);
        setEmployers(data.rows);
      } catch (err) {
        console.log(err);
        const error = err.response.data.error;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employer Page</h1>
      <table className="w-full border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {employers.map((employer) => (
            <tr key={employer.id}>
              <td className="py-2 px-4 border-b">{employer.companyName}</td>
              <td className="py-2 px-4 border-b">{employer.status}</td>
              <td className="py-2 px-4 border-b">{employer.location}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleDetail(employer.id)}
                >
                  Detail
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                  onClick={() => handleVerify(employer.id)}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
