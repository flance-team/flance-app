// import { useState } from "react";
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const inputForm = (el) => {
    setFormValue({
      ...formValue,
      [el.target.name]: el.target.value,
    });
  };
  const formOnSubmit = async (el) => {
    el.preventDefault();
    // const response = JSON.stringify(formValue);
    // console.log(response, "ini response");
    const response = await axios.post("http://localhost:3000/login", formValue);
    console.log(response);
  };
  return (
    <React.Fragment>
      <div className="flex flex-row w-screen h-screen">
        <div className="flex-initial w-7/12 h-screen">
          <img
            src="./Possible.jpg"
            className="object-cover w-full h-full"
            alt="Image"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-5/12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Flance!</h1>
            <p className="text-lg">Login to your account</p>
          </div>
          <form className="flex flex-col items-center">
            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                placeholder="Type here"
                name="email"
                className="input input-bordered w-full max-w-xs"
                onChange={inputForm}
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={inputForm}
              />
            </div>
            <button className="btn btn-outline w-full" onClick={formOnSubmit}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginForm;
