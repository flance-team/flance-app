"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const base_url_server = "http://localhost:3000";
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("role") === "employer") {
      router.push("/EmployerHome");
    }
    if (localStorage.getItem("role") === "user") {
      router.push("/UserHome");
    }
  }, []);

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
      localStorage.setItem("role", response.data.role);
      localStorage.getItem("role") === "employer"
        ? localStorage.setItem("nameUser", response.data.companyName)
        : localStorage.setItem("nameUser", response.data.name);

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
    <>
      <div className="h-screen">
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Flance"
                />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Not a member yet?{" "}
                </p>
                <p>
                  <Link
                    href="/SignUpForm"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Register as Applicant
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/SignUpFormEmployer"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Register as Employer
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                <div>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          id="email"
                          placeholder="Type here"
                          name="email"
                          onChange={inputForm}
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Type here"
                          onChange={inputForm}
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={formOnSubmit}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
