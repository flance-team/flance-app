"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const LoginForm = () => {
  const router = useRouter();
  const base_url_server = "http://localhost:3000";
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const inputForm = (el) => {
    setFormValue({
      ...formValue,
      [el.target.name]: el.target.value,
    });
  };

  const formOnSubmit = async (el) => {
    el.preventDefault();
    if (formValue.email.trim() === "" || formValue.password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please input your credentials`,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${base_url_server}/login`, formValue);
      Swal.fire({
        width: 200,
        icon: "success",
        text: `Welcome to Flance`,
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("nameUser", response.data.name);
      localStorage.setItem("role", response.data.role);
      if (response.data.role === "user") {
        router.push("/UserHome");
      } else {
        router.push("/EmployerHome");
      }
    } catch (err) {
      console.log(err);
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

  if (loading) {
    return <Loading />;
  }

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
