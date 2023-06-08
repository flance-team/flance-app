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
  const [imgProfile, setimgProfile] = useState();
  const [emailUser, setemailUser] = useState();

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
  const balanceRender = async () => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const response = await axios.get(
        `${base_url_server}/transactions/user/balance`,
        { headers }
      );
      const formattedAmount = response.data.balance.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      console.log(response.data);
      setemailUser(response.data.User.email);
      setimgProfile(response.data.User.imgUrl);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    balanceRender();
  }, []);
  return (
    <>
      <div className="min-h-full">
        {/* INI BUNGKUS BIRU FLEX KOLOM */}
        <div className="flex flex-1 flex-col ">
          <NavBarUser />
          {/* INI BUNGKUS YANG KUNING BIKIN JADI DI TENGAH, HEIGHTNYA TERGANTUNG ISI DARI ELEMENTNYA BERAPA MENYESUAIKAN h-fit */}
          <main className="flex-1 pb-8 w-3/4 m-auto h-fit w-full">
            <div className="mt-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg font-medium leading-6 text-gray-900"></h2>
                <div className="mt-2 flex">
                  <div className="overflow-hidden rounded-lg bg-white shadow w-1/3 mr-2">
                    <div className="p-5">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center">
                          <div className="w-32 h-32 flex rounded-full overflow-hidden">
                            <img
                              src={imgProfile}
                              alt="Profile Image"
                              className=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-3">
                      <div className="text-lg font-medium text-gray-900">
                        Hello, {nameUser}!
                      </div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white shadow w-full">
                    <div className="w-full bg-base-100 shadow-xl">
                      <div className="card-body w-full">
                        <div className="flex justify-items-center">
                          <h2 className="card-title">Search anything here</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <h2 className="text-lg">What...</h2>
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
                </div>
              </div>

              {/* END */}
            </div>
            <div className="bg-white-200 mt-10"></div>
            <div className="bg-white-200 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
                {dataJob
                  .slice((currentPage - 1) * 8, currentPage * 8)
                  .map((el) => {
                    return (
                      <div
                        key={el.id}
                        className="card w-full bg-base-100 shadow-xl"
                      >
                        <div className="card-body drop-shadow-md">
                          <h2 className="card-title">{el.title}</h2>
                          <p>Rate Per Hour: Rp. {el.salary}</p>
                          <p>Total Work Hours: {el.totalHours} / Week</p>
                          <p>Location: {el.location}</p>
                          <div className="card-actions flex items-center justify-between">
                            <div>
                              Total Applicant:
                              <progress
                                className="progress w-20 ml-1"
                                value={el.countApplicant}
                                max="5"
                              ></progress>
                            </div>
                            <button
                              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => {
                                setOpen(true);
                                jobDetail(el.id);
                              }}
                            >
                              Details
                            </button>
                          </div>
                          <div className="absolute top-5 right-5">
                            <img
                              className="rounded-full h-12 w-12"
                              src={el.Employer.imgUrl}
                              alt="Circle Image"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-red-400 mt-10">
              {" "}
              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-2"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * 8 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * 8, dataJob.length)}
                    </span>{" "}
                    of <span className="font-medium">{dataJob.length}</span>{" "}
                    results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  <button
                    className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                      currentPage === 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
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
          </main>
        </div>
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
