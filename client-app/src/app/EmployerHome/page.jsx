"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarEmployer from "../../components/NavbarEmployer";
import Swal from "sweetalert2";
import ApplicantModal from "../../components/ModalApplicant";
import CreateJobForm from "../../components/CreateJobForm";
import Loading from "../../components/Loading";
import { useRouter } from "next/navigation";
import CardDetailJob from "@/components/CardDetailJob";
const base_url_server = "http://localhost:3000";

const EmployerHome = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [nameUser, setNameUser] = useState("");
  const [open, setOpen] = useState(false);
  const [detailJob, setDetailJob] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/");
    }

    if (localStorage.getItem("role") === "user") {
      router.push("/UserHome");
    }

    setNameUser(localStorage.getItem("nameUser"));
  }, []);

  useEffect(() => {
    getJobs();
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const response = await axios.get(
        `${base_url_server}/transactions/employer/balance`,
        { headers }
      );
      setProfile(response.data.Employer);
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

  const getJobs = async () => {
    try {
      const response = await axios.get(`${base_url_server}/jobs/list`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getApplicants = async (jobId) => {
    try {
      const response = await axios.get(
        `${base_url_server}/jobs/list-applier/${jobId}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      setApplicants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailsClick = async (jobId) => {
    setSelectedJobId(jobId);
    await getApplicants(jobId);
    setShowApplicantsModal(true);
  };

  const handleAcceptReject = async (applicantId, status) => {
    try {
      if (status === "accepted") {
        await axios.patch(
          `${base_url_server}/jobs/offer/${applicantId}`,
          {},
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        Swal.fire({
          width: 200,
          icon: "success",
          text: `User ${applicantId} has been accepted`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.patch(
          `${base_url_server}/jobs/reject/${applicantId}`,
          {},
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        Swal.fire({
          width: 200,
          icon: "success",
          text: `User ${applicantId} has been rejected`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      await getApplicants(selectedJobId);
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

  const handleCloseApplicantsModal = () => {
    setShowApplicantsModal(false);
  };

  const handleCreateJob = async (newJob) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${base_url_server}/jobs`, newJob, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      Swal.fire({
        width: 200,
        icon: "success",
        text: `Job ${data.title} created successfully`,
        showConfirmButton: false,
        timer: 1500,
      });

      setShowCreateJobForm(false);
      await getJobs();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to create job";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const jobDetail = async (id) => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const data = await axios.get(
        `${base_url_server}/jobs/schedules-job/${id}`,
        {
          headers,
        }
      );
      setDetailJob(data.data);
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

  if (loading) {
    return <Loading />;
  }

  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      department: "Optimization",
      email: "lindsay.walton@example.com",
      role: "Member",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-1 flex-col">
          <NavbarEmployer />
          <main className="flex-1 pb-8 w-3/4 m-auto h-fit shadow-md">
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src={profile?.imgUrl}
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src={profile?.imgUrl}
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            {nameUser}
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                            {profile?.location}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    {/* created job form modal / button */}
                    {showCreateJobForm ? (
                      <CreateJobForm
                        onCreateJob={handleCreateJob}
                        onClose={() => setShowCreateJobForm(false)}
                      />
                    ) : (
                      <button
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setShowCreateJobForm(true)}
                      >
                        Create New Job
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-sm">&nbsp;</div>

            <div className="px-4 sm:px-6 lg:px-8 mt-2">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Jobs
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all jobs created by you
                  </p>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Total Hours
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {jobs.map((el) => (
                          <tr key={el.id}>
                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    <b> {el.title}</b>
                                  </div>
                                  <div className="mt-1 text-gray-500">
                                    {el.location}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <div className="text-gray-900">
                                <b> {el.totalHours} hours</b> / week
                              </div>
                              <div className="mt-1 text-gray-500">
                                {el.salary.toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                })}{" "}
                                / hour
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              {el.status === "active" ? (
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  {el.status}
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                  {el.status}
                                </span>
                              )}
                            </td>

                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <button
                                className="block rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 m-2"
                                onClick={() => handleDetailsClick(el.id)}
                              >
                                List Applicant
                              </button>
                              <button
                                className="block rounded-md bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 m-2"
                                onClick={() => {
                                  setOpen(true), jobDetail(el.id);
                                }}
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* batas table baru */}
          </main>
        </div>
        <footer className="bg-white shadow"></footer>
      </div>

      {showApplicantsModal && (
        <ApplicantModal
          applicants={applicants}
          handleAcceptReject={handleAcceptReject}
          onClose={handleCloseApplicantsModal}
        />
      )}

      {/* CARD DETAIL */}
      {open && (
        <CardDetailJob
          open={open}
          setOpen={setOpen}
          detailJob={detailJob}
          clickAccept={null}
        />
      )}
    </>
  );
};

export default EmployerHome;
