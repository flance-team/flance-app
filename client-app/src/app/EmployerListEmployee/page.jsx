"use client";
import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import NavbarEmployer from "../components/NavbarEmployer";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { Dialog, Transition } from "@headlessui/react";

const base_url_server = "http://localhost:3000";

const EmployerListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chosenUser, setChosenUser] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (employee) => {
    console.log(employee);
    setChosenUser(employee);
    openModal();
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
                      <td className="border text-center">
                        {employee.totalSalary.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="border text-center">
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => handlePay(employee)}
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-screen transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Wage Payment Summary
                  </Dialog.Title>
                  <div className="mt-2 flex">
                    <div className="w-1/4">
                      <div className="avatar">
                        <div className="w-32 rounded">
                          <img src="https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhcmlzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60" />
                        </div>
                      </div>
                      <p className="text-sm text-black font-medium">
                        Employee Info
                      </p>
                      <p className="text-sm text-gray-500">
                        Name: {chosenUser.User.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Address: {chosenUser.User.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        Gender: {chosenUser.User.gender}
                      </p>
                      <p className="text-sm text-gray-500">
                        Phone Number: {chosenUser.User.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        Email: {chosenUser.User.email}
                      </p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div>
                      <h2>Rate Per Hour Fee: {chosenUser.Job.salary}</h2>
                    </div>
                    {/* <p>{JSON.stringify(chosenUser)}</p> */}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EmployerListEmployee;
