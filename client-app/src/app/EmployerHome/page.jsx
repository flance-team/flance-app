"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarEmployer from "../components/NavbarEmployer";
import Swal from "sweetalert2";
import ApplicantModal from "../components/ModalApplicant";
import CreateJobForm from "../components/CreateJobForm";
import Loading from "../components/Loading";

const base_url_server = "http://localhost:3000";

const EmployerHome = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJobs();
  }, []);

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
    console.log(newJob);
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
                  Hello, {localStorage.getItem("nameUser")}
                </h2>
              </div>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Job List</h2>
              {/* created job form modal / button */}
              {showCreateJobForm ? (
                <CreateJobForm
                  onCreateJob={handleCreateJob}
                  onClose={() => setShowCreateJobForm(false)}
                />
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCreateJobForm(true)}
                >
                  Create New Job
                </button>
              )}
            </div>
            <div className="flex bg-white rounded-lg flex-col items-center space-y-2">
              <table className="w-full border">
                <thead>
                  <tr>
                    <th className="border">Title</th>
                    <th className="border">Location</th>
                    <th className="border">Rate/Hour</th>
                    <th className="border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs?.map((el) => {
                    return (
                      <tr key={el.id}>
                        <td className="border text-center">{el.title}</td>
                        <td className="border text-center">{el.location}</td>
                        <td className="border text-center">{el.salary}</td>
                        <td className="border text-center">
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => handleDetailsClick(el.id)}
                          >
                            List Applicant
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
    </>
  );
};

export default EmployerHome;
