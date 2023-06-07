"use client";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBarUser from "../../components/navbarUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const UserAcceptOffer = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const base_url_server = "http://localhost:3000";
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [detailJob, setDetailJob] = useState();
  const router = useRouter();

  if (!localStorage.getItem("access_token")) {
    router.push("/");
  }

  if (localStorage.getItem("role") === "employer") {
    router.push("/EmployerHome");
  }

  const statusAccept = async (id) => {
    setLoading(true);
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const response = await axios.patch(
        `${base_url_server}/jobs/accept/${id}`,
        null,
        {
          headers,
        }
      );
      Swal.fire({
        width: 200,
        icon: "success",
        text: `You just accept this job`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      const error = err.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };
  const statusDecline = async (id) => {
    setLoading(true);

    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const response = await axios.patch(
        `${base_url_server}/jobs/reject-user/${id}`,
        null,
        { headers }
      );
      Swal.fire({
        width: 200,
        icon: "success",
        text: `You just decline this job`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      const error = err.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };
  const appliedJob = async () => {
    setLoading(true);
    const headers = {
      access_token: localStorage.getItem("access_token"),
    };
    const response = await axios.get(`${base_url_server}/jobs/list-apply`, {
      headers,
    });
    setLoading(false);
    setData(response.data);
  };
  const jobDetail = async (id) => {
    setDetailJob("");
    setLoading(true);
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const data = await axios.get(`${base_url_server}/jobs/schedules/${id}`, {
        headers,
      });
      setOpen(true);
      setDetailJob(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const buttonAction = (status, id) => {
    if (status === "pending") {
      return (
        <>
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-500 hover:bg-gray-50 mx-1"
            onClick={() => {
              statusAccept(id);
            }}
          >
            Accept
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50 mr-1"
            onClick={() => {
              statusDecline(id);
            }}
          >
            Decline
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-gray-50"
            onClick={() => {
              jobDetail(id);
            }}
          >
            Contract
          </button>
        </>
      );
    } else {
      return (
        <button
          type="button"
          className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => {
            setOpen(true);
          }}
        >
          Contract
        </button>
      );
    }
  };
  useEffect(() => {
    buttonAction();
  }, [statusAccept]);
  useEffect(() => {
    appliedJob();
  }, []);
  return (
    <>
      <NavBarUser />
      <div className="bg-white min-h-screen flex flex-col mx-7 my-2">
        <header className="bg-white shadow">{/* Header content */}</header>
        <div className="flex flex-grow">
          <aside className="bg-white w-64">{/* Sidebar content */}</aside>
          <main className="flex-wrap bg-white py-1 justify-center static">
            {/* Main content */}
            <div className="flex justify-start my-2">
              <h1 className="text-3xl">
                Hello, {localStorage.getItem("nameUser")}
              </h1>
            </div>
            <div className="flex justify-start my-2">
              <h1 className="text-1xl">
                You have {data?.length} of jobs you applied
              </h1>
            </div>

            <div className="absolute w-3/5">
              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Job Postings
                </h3>
              </div>
              <ul role="list" className="divide-y divide-gray-100">
                {data?.map((person) => (
                  <li
                    key={person.id}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src={person.imageUrl}
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {person.Job.title}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {person.Job.Employer.companyName},{""}
                          {person.Job.location}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Status: {person.status}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 py-2 px-2">
                        {buttonAction(person.status, person.Job.id)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <aside className="bg-white w-64 my-2">{/* Sidebar content */}</aside>
        </div>
        <footer className="bg-white shadow">{/* Footer content */}</footer>
      </div>

      {/* Show Contract Modal */}
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
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        This is your contract integrated with blockchain
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex flex-wrap break-all">
                          {detailJob?.hash}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
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

export default UserAcceptOffer;
