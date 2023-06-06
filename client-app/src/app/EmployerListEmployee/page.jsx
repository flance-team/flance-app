"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarEmployer from "../components/NavbarEmployer";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const base_url_server = "http://localhost:3000";

const EmployerListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${base_url_server}/jobs/list-employee`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (employeeId) => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      text: `Payment for employee ${employeeId} has been processed.`,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavbarEmployer />
      <div className="bg-white min-h-screen flex flex-col mx-7 my-2 mt-3">
        <header className="bg-white shadow">{/* Header content */}</header>
        <div className="flex flex-grow">
          {/* CARD SEBELAH KIRI */}
          <aside className="bg-white w-64">
            <div className="card w-56 bg-base-100 shadow-xl items-center">
              <div className="w-32 h-32 flex justify-center rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile Image"
                />
              </div>
              <div className="card-body text-center items-center">
                <h2 className="card-title text-xl font-semibold place-items-center">
                  {localStorage.getItem("nameUser")}
                </h2>
              </div>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Employee List</h2>
            </div>
            <div className="flex bg-white rounded-lg flex-col items-center space-y-2">
              <table className="w-full border">
                <thead>
                  <tr>
                    <th className="border">Name</th>
                    <th className="border">Job Title</th>
                    <th className="border">Total Hours</th>
                    <th className="border">Salary</th>
                    <th className="border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="border text-center">
                        {employee.User.name}
                      </td>
                      <td className="border text-center">
                        {employee.Job.title}
                      </td>
                      <td className="border text-center">
                        {employee.totalHours}
                      </td>
                      <td className="border text-center">{employee.salary}</td>
                      <td className="border text-center">
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => handlePay(employee.id)}
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="bg-white shadow"></footer>
      </div>
    </>
  );
};

export default EmployerListEmployee;
