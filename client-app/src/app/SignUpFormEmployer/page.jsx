//signup Employer
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
const base_url_server = "http://localhost:3000";
const SignUpForm = () => {
  const router = useRouter();
  const [dataCat, setDataCat] = useState();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    companyName: "",
    address: "",
    location: "",
    phoneNumber: "",
    PIC: "",
    typeId: "",
  });
  const inputForm = (el) => {
    setFormValue({
      ...formValue,
      [el.target.name]: el.target.value,
    });
  };
  const formOnSubmit = async (el) => {
    el.preventDefault();
    const response = await axios.post("http://localhost:3000/users", formValue);
  };
  const dataCategory = async () => {
    try {
      const response = await axios.get(`${base_url_server}/admins/category`);
      const dataCat = response.data.rows;
      setDataCat(dataCat);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dataCategory();
  }, []);

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <div className="flex-initial w-5/12 h-screen">
          <img
            src="./SignUpUser.jpg"
            className="object-cover w-full h-full"
            alt="Image"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-7/12">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-bold mb-2">Welcome to Flance!</h1>
            <p className="text-lg">Please fill the form below!</p>
          </div>
          <form className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="companyName"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="location"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="email"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                name="password"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="phoneNumber"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Person in Charge:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="PIC"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Type of Company:</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="typeId"
                onChange={inputForm}
              >
                <option defaultValue>Pick one</option>
                {dataCat?.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Address:</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Address"
                name="address"
                onChange={inputForm}
              ></textarea>
            </div>
            <div className="col-span-2">
              <button className="btn btn-outline w-full">Sign Up</button>
            </div>
          </form>
          <div className="flex items-center mt-5">
            <span className="mr-2">Already have an account?</span>
            <button
              className="btn btn-outline"
              onClick={() => router.push("/LoginForm")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
