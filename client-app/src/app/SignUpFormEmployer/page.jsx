//signup Employer
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../../components/Loading";
import Link from "next/link";
const base_url_server = "http://localhost:3000";
const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    imgUrl: "",
  });

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

  const formOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${base_url_server}/employers`,
        formValue
      );
      Swal.fire({
        width: 200,
        icon: "success",
        text: `Employer has been created successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/LoginForm");
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

  const dataCategory = async () => {
    try {
      const response = await axios.get(`${base_url_server}/admins/type`);
      const dataCat = response.data.rows;
      setDataCat(dataCat);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataCategory();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="isolate bg-gray-100 px-4 py-10 sm:py-10 lg:px-8">
        <div className="grid grid-cols-3 w-full">
          <div className="flex justify-start items-start">&nbsp;</div>

          <div className="mx-auto max-w-2xl sm:text-center">
            <div className="flex justify-center items-center my-3">
              <Link href="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/flance-phs3.appspot.com/o/Logo%20-%20Team%201.png?alt=media&token=595f07be-d906-4964-89af-22ff358730fb&_gl=1*cn26g*_ga*MjA1NTA0MjE1Ny4xNjgzOTY5NDQ5*_ga_CW55HF8NVT*MTY4NjEyNTc2OS4xMC4xLjE2ODYxMjU5NTcuMC4wLjA."
                  width={100}
                  height={100}
                  alt="Flance Logo"
                />
              </Link>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Employer Sign Up
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Join Flance for giving more part time job opportunities.
            </p>
          </div>

          <div className="">&nbsp;</div>
        </div>

        <div className="space-y-10 divide-y divide-gray-900/10 p-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Company Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed to all applicants.
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        onChange={inputForm}
                        autoComplete="companyName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={inputForm}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={inputForm}
                        autoComplete="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Location
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        onChange={inputForm}
                        autoComplete="location"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="typeId"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="typeId"
                        name="typeId"
                        onChange={inputForm}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        onChange={inputForm}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write your complete address.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="imgUrl"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image profile URL
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="imgUrl"
                        id="imgUrl"
                        onChange={inputForm}
                        autoComplete="imgUrl"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Person In Charge Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We will contact this person for verification process.
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="PIC"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Person in charge name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="PIC"
                        id="PIC"
                        onChange={inputForm}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={inputForm}
                        autoComplete="mobile-phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => formOnSubmit(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end w-full">
            <div className=" items-center mt-5">
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
        <div className="flex items-center justify-end w-full">
          <div className=" items-center">
            <span className="mr-2">
              Sign up as an{" "}
              <Link href="/SignUpForm">
                <b className="text-blue-800">Applicant?</b>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
