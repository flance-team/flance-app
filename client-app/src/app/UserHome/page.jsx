"use client";
import axios from "axios";
import { Fragment, useRef } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import NavBarUser from "../../components/navbarUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CardJob from "../../components/CardJob";
import CardDetailJob from "@/components/CardDetailJob";

const UserHome = () => {
  const base_url_server = "http://localhost:3000";
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [dataJob, setDataJob] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [detailJob, setDetailJob] = useState();
  const [flag, setFlag] = useState(0);

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
    try {
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
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      setFlag(flag + 1);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, flag]);

  const fetchJobs = async () => {
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

      setTotalPages(Math.ceil(data.length / 8));
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

  const handleSearchSubmit = async () => {
    setCurrentPage(1);
    fetchJobs();
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <NavBarUser />
      <div className="bg-white min-h-20 flex flex-col mx-7 my-2">
        <header className="bg-white shadow">{/* Header content */}</header>
        <div className="flex flex-grow">
          <aside className="bg-white w-64 my-2 mx-2">
            {/* Sidebar content */}

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
          {dataJob.slice((currentPage - 1) * 8, currentPage * 8).map((el) => {
            return (
              <div key={el.id} className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{el.title}</h2>
                  <p>Rate Per Hour: Rp. {el.salary}</p>
                  <p>Total Work Hours: {el.totalHours} / Week</p>
                  <p>Location: {el.location}</p>

                  <div className="card-actions space-x-0">
                    {/* applicant: {el.countApplicant} */}
                    <div>
                      Total Applicant:
                      <progress
                        className="progress w-20 ml-1"
                        value={el.countApplicant}
                        max="5"
                      ></progress>
                    </div>
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
        <nav
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-2"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{(currentPage - 1) * 8 + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * 8, dataJob.length)}
              </span>{" "}
              of <span className="font-medium">{dataJob.length}</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <button
              className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                currentPage === totalPages
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </nav>
      </div>

      {/* CARD DETAIL */}
      {open && (
        <CardDetailJob
          open={open}
          setOpen={setOpen}
          detailJob={detailJob}
          clickAccept={clickAccept}
        />
      )}
    </>
  );
};

export default UserHome;
