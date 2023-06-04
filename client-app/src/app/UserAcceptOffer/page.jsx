"use client";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBarUser from "../components/navbarUser";
const UserAcceptOffer = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const base_url_server = "http://localhost:3000";
  const data = [
    {
      id: 1,
      title: "Barista Semesta",
      employer: 1,
      location: "Bandung",
      salary: 100000,
      expireDate: "2023-09-12",
      status: "Pending",
      categoryId: 1,
      totalHour: 20,
      duration: 2,
      Category: {
        id: 1,
        name: "Barista",
      },
      Employer: {
        id: 1,
        CompanyName: "Flance",
      },
    },
    {
      id: 2,
      title: "Barista Lokal",
      employer: 1,
      location: "Bandung",
      salary: 100000,
      expireDate: "2023-09-12",
      status: "Accepted",
      categoryId: 1,
      totalHour: 20,
      duration: 2,
      Category: {
        id: 1,
        name: "Barista",
      },
      Employer: {
        id: 1,
        CompanyName: "Flance",
      },
    },
  ];
  const statusAccept = async (id) => {
    const headers = {
      access_token: localStorage.getItem("access_token"),
    };
    const response = await axios.patch(`${base_url_server}/jobs/accept/${id}`, {
      headers,
    });
  };
  const statusDecline = async (id) => {
    const headers = {
      access_token: localStorage.getItem("access_token"),
    };
    const response = await axios.patch(
      `${base_url_server}/jobs/reject-user/${id}`,
      { headers }
    );
  };

  const buttonAction = (status, id) => {
    if (status === "Pending") {
      return (
        <>
          <button
            className="btn btn-success mr-1"
            onClick={() => {
              statusAccept(id);
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-error mr-1"
            onClick={() => {
              statusDecline(id);
            }}
          >
            Decline
          </button>
          <button
            className="btn btn-outline btn-info mr-1"
            onClick={() => {
              setOpen(true);
            }}
          >
            Contract
          </button>
        </>
      );
    } else {
      <button
        className="btn btn-outline btn-info mr-2"
        onClick={() => {
          setOpen(true);
        }}
      >
        Contract
      </button>;
    }
  };

  const ShowContract = async () => {
    try {
      const response = await axios.get(`${base_url_server}`);
    } catch (err) {}
  };

  useEffect(() => {
    buttonAction();
  }, [statusAccept]);
  return (
    <>
      <NavBarUser />
      <div className="bg-white min-h-screen flex flex-col mx-7 my-2">
        <header className="bg-white shadow">{/* Header content */}</header>
        <div className="flex flex-grow">
          <aside className="bg-white w-64">{/* Sidebar content */}</aside>
          <main className="flex-wrap bg-white py-1 justify-center">
            {/* Main content */}
            <div className="flex justify-start my-2">
              <h1 className="text-3xl">Hello, User</h1>
            </div>
            <div className="flex justify-start my-2">
              <h1 className="text-1xl">
                You have (amount) of jobs you applied:
              </h1>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Company Name</th>
                    <th>Location</th>
                    <th>Expired Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((el) => {
                    return (
                      <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.title}</td>
                        <td>{el.Employer.CompanyName}</td>
                        <td>{el.location}</td>
                        <td>{el.expireDate}</td>
                        <td>{el.status}</td>
                        <td>{buttonAction(el.status, el.id)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* foot */}
              </table>
            </div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Job Postings
              </h3>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {data.map((person) => (
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
                        {person.title}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {person.Employer.CompanyName}, {person.location}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.status}, until: {person.expireDate}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      disini
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </main>

          <aside className="bg-white w-64 my-2">
            {/* Sidebar content */}
            {/* <div className="card w-56 bg-base-100 shadow-xl">
              <div class="w-24 mask mask-squircle">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <h2 className="card-title text-sm my-2 mx-2">Sponsors:</h2>
              <div className="card-body items-center text-center">
                <h3 className="container bg-gray-200">YOUR LOGO HERE</h3>
                <p>Support flance by becoming a sponsor</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div> */}

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
                        <p className="text-sm text-gray-500">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Eius aliquam laudantium explicabo pariatur iste
                          dolorem animi vitae error totam. At sapiente aliquam
                          accusamus facere veritatis.
                        </p>
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
