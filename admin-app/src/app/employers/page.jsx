"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import "../../styles/global.css";
import DetailModal from "../../components/DetailModal";
import authMiddleware from "@app/middleware";
const baseUrl = "http://localhost:3000";

const EmployerPage = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState(false);

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
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchEmployers();
  }, [flag]);

  const handleDetail = (employerId) => {
    const selected = employers.find((employer) => employer.id === employerId);
    setSelectedEmployer(selected);
    setShowModal(true);
  };

  const handleVerify = async (employerId, status) => {
    setFlag(true);
    try {
      const { data } = await axios.patch(
        `${baseUrl}/admins/verifyemployer/${employerId}`,
        { status },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );

      Swal.fire({
        width: 200,
        icon: "success",
        text: `Employer Verification process completed successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      const error = err.response.data.error;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      setFlag(false);
    }
  };

  const closeModal = () => {
    setSelectedEmployer(null);
    setShowModal(false);
  };

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
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleDetail(employer.id)}
                >
                  Detail
                </button>
                {employer.status === "pending" ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                      onClick={() => handleVerify(employer.id, "verified")}
                    >
                      Verify
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-2"
                      onClick={() => handleVerify(employer.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedEmployer && (
        <DetailModal employer={selectedEmployer} closeModal={closeModal} />
      )}
    </div>
  );
};

export default authMiddleware(EmployerPage);
