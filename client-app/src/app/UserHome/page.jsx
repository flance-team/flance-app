"use client";
import axios from "axios";
import { Fragment, useRef } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import NavBarUser from "../../components/navbarUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CardJob from "../../components/CardJob";

const UserHome = () => {
  const base_url_server = "http://localhost:3000";
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [nameUser, setNameUser] = useState("");
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleLocationQueryChange = (event) => {
    setLocationQuery(event.target.value);
  };
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/");
    }

    if (localStorage.getItem("role") === "employer") {
      router.push("/EmployerHome");
    }

    setNameUser(localStorage.getItem("nameUser"));
  }, []);

  const handleSearchSubmit = async () => {
    let option = "";
    if (searchQuery !== "") {
      option += "?tit=" + searchQuery;
    }
    if (locationQuery !== "") {
      searchQuery === ""
        ? (option += "?loc=" + locationQuery)
        : (option += "&loc=" + locationQuery);
    }

    try {
      const { data } = await axios.get(
        `${base_url_server}/jobs/home${option}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      setDataJob(data);
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [dataJob, setDataJob] = useState([]);
  const [detailJob, setDetailJob] = useState();

  const jobs = async () => {
    const data = await axios.get(`${base_url_server}/jobs/home`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    setDataJob(data.data);
  };

  const jobDetail = async (id) => {
    const headers = {
      access_token: localStorage.getItem("access_token"),
    };
    const data = await axios.get(`${base_url_server}/jobs/schedules/${id}`, {
      headers,
    });
    setDetailJob(data.data);
  };

  const clickAccept = async () => {
    setOpen(false);
    const headers = {
      access_token: localStorage.getItem("access_token"),
    };
    const id = detailJob.id;
    const response = await axios.post(
      `${base_url_server}/jobs/apply/${id}`,
      null,
      { headers }
    );
    Swal.fire({
      width: 400,
      icon: "success",
      text: `You just apply this job`,
      showConfirmButton: true,
    });
  };

  useEffect(() => {
    jobs();
  }, []);

  return (
    <>
      <NavBarUser />
      <div className="bg-white min-h-20 flex flex-col mx-7 my-2">
        <header className="bg-white shadow">{/* Header content */}</header>
        <div className="flex flex-grow">
          <aside className="bg-white w-64 my-2 mx-2">
            {/* Sidebar content */}
            {/* <div className="card w-56 bg-base-100 shadow-xl items-center">
              <div className="w-32 h-32 flex  justify-center rounded-full overflow-hidden my-1">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile Image"
                  className=""
                />
              </div>
              <div className="card-body text-center items-center">
                <h2 className="card-title text-xl font-semibold place-items-center">
                  {localStorage.getItem("nameUser")}
                </h2>
                <p className="text-sm text-gray-500 text-xs">
                  Full-stack developer
                </p>
              </div>
            </div> */}
            <div className="w-56 h-60 bg-base-100 shadow-xl flex flex-col items-center mx-2 my-2">
              <div className="w-32 h-32 flex justify-center rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile Image"
                  className=""
                />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mt-2">{nameUser}</h2>
                {/* <p className="text-sm text-gray-500 text-xs">
                  Full-stack developer
                </p> */}
              </div>
            </div>
          </aside>
          <main className="flex-grow bg-white py-1 flex justify-center">
            {/* Main content */}
            <div className="flex bg-white rounded-lg flex-col items-center space-y-2">
              <div className="card w-fit bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-items-center">
                    <h2 className="card-title">Search anything here</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-lg">What...</h2>
                      {/* <label
                        htmlFor="input1"
                        className="input-label text-xs my-1"
                      >
                        job title, keyword, company name
                      </label> */}
                      <input
                        id="input1"
                        type="text"
                        placeholder="job title, keyword, company name"
                        className="input input-bordered"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg">Where...</h2>
                      {/* <label
                        htmlFor="input2"
                        className="input-label text-xs my-1"
                      >
                        city or state
                      </label> */}
                      <input
                        id="input2"
                        type="text"
                        className="input input-bordered"
                        placeholder="city or state"
                        value={locationQuery}
                        onChange={handleLocationQueryChange}
                      />
                    </div>
                  </div>
                  <div className="card-actions justify-center mt-2">
                    <button
                      className="btn btn-primary w-full"
                      onClick={handleSearchSubmit}
                    >
                      Find Jobs
                    </button>
                    <h4 className="text-xs">
                      see what happends when you start finding
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <aside className="bg-white w-64 my-2">
            {/* Sidebar content */}
            <div className="w-56 bg-base-100 shadow-xl">
              <div className="w-24 mask mask-squircle">
                <img src="" />
              </div>
              <h2 className="card-title text-sm my-2 mx-2">Sponsors:</h2>
              <div className="card-body items-center text-center">
                <h3 className="container bg-gray-200">YOUR LOGO HERE</h3>
                <p className="text-xs">Support flance by becoming a sponsor</p>
                {/* <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col text-xs mt-4">
              <div className="flex flex-wrap flex-row space-x-3">
                <a>About</a>
                <a>Accessbility</a>
              </div>
              <div className="flex flex-wrap flex-row space-x-3 mt-2">
                <a>Help Center</a>
                <a>Get Flance App</a>
              </div>
            </div>
          </aside>
        </div>
        <footer className="bg-white shadow">{/* Footer content */}</footer>
      </div>
      <div className="bg-white min-h-16 flex flex-col mx-10 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* disini */}
          {dataJob?.map((el) => {
            return (
              <div key={el.id} className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{el.title}</h2>
                  <p>Rate Per Hour: {el.salary}</p>
                  <p>Total Work Hours: {el.totalHours} / Week</p>
                  <p>Location: {el.location}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setOpen(true), jobDetail(el.id);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 sm:mt-5">
                      <div className="text-center">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          JOB DETAILS
                        </Dialog.Title>
                      </div>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">
                          {detailJob?.title}
                        </p>
                        <div className="mt-1 text-sm mr-1">
                          <h3 className="mb-1">
                            HOURS REQUIRED: {detailJob?.totalHours} hours
                          </h3>
                          <h3 className="mb-2 flex-wrap break-all">
                            Hash: {detailJob?.hash}
                          </h3>
                          <h3 className="mb-2">
                            Salary: Rp. {detailJob?.salary}
                          </h3>
                          <h3 className="mb-2">
                            Company: {detailJob?.Employer.companyName}
                          </h3>
                          {detailJob?.Schedules.map((el) => (
                            <div key={el.id} className="space-y-1">
                              <h3 className="mb-1">
                                Day: {el.day}, Start: {el.startHour}, Total
                                Hour: {el.totalHour}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => clickAccept()}
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UserHome;
