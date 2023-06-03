"use client";

import { useEffect, useState } from "react";
import axios from "axios";
const UserAcceptOffer = () => {
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
    const response = await axios.patch(`${base_url_server}/jobs/accept/${id}`);
  };
  const statusDecline = async (id) => {
    const headers = {
      access_token: localStorage.getItem("access_token"),
    };
    const response = await axios.patch(
      `${base_url_server}/jobs/reject-user/${id}`
    );
  };

  const buttonAction = (status, id) => {
    if (status === "Pending") {
      return (
        <>
          <button
            className="btn btn-success mr-2"
            onClick={() => {
              statusAccept(id);
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-error"
            onClick={() => {
              statusDecline(id);
            }}
          >
            Decline
          </button>
        </>
      );
    }
    // else {
    //   return (
    //     <>
    //       <button className="btn btn-success mr-2">Detail</button>
    //     </>
    //   );
    // }
  };
  useEffect(() => {
    buttonAction();
  }, [statusAccept]);
  return (
    <>
      {/* <NavBar /> */}
      <div>
        <h1>List of jobs Apllied</h1>
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
    </>
  );
};

export default UserAcceptOffer;
