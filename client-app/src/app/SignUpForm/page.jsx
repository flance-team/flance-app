"use client";
//signup User
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BadgeInput from "../components/BadgeInput";
import Loading from "../components/Loading";
import authMiddleware from "../middleware";
const base_url_server = "http://localhost:3000";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataSkill, setDataSkill] = useState();
  const dataSkills = async () => {
    try {
      const response = await axios.get(`${base_url_server}/admins/skill`);
      const data = response.data.rows;
      setDataSkill(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedValues, setSelectedValues] = useState([]);
  const [skill, setSkill] = useState([]);
  const [parentBadges, setParentBadges] = useState([]);

  const handleBadgesChange = (badges) => {
    setParentBadges(badges);
  };

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    address: "",
    phoneNumber: "",
    gender: "",
    city: "",
  });
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
      formValue.skills = parentBadges;
      const { data } = await axios.post(`${base_url_server}/users`, formValue);
      Swal.fire({
        width: 200,
        icon: "success",
        text: `User Registered successfully`,
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

  if (loading) {
    return <Loading />;
  }

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (!selectedValues.includes(selectedValue)) {
      setSelectedValues([...selectedValues, selectedValue]);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row w-screen h-max">
        <div className="flex-initial w-5/12 h-screen">
          <img
            src="./SignUpUser.jpg"
            className="object-cover w-full h-full"
            alt="Image"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-7/12">
          <div className="text-center mb-2 space-y-2">
            <h1 className="text-3xl font-bold mb-2">Welcome to Flance!</h1>
            <p className="text-lg">Please fill the form below!</p>
          </div>
          <form className="grid grid-cols-2 gap-4 w-full max-w-xs">
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
                <span className="label-text">Full Name:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="name"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="username"
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
                <span className="label-text">Gender:</span>
              </label>
              <select
                className="select select-bordered"
                name="gender"
                onChange={inputForm}
              >
                <option defaultValue>Pick one</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
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
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">City:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="city"
                className="input input-bordered w-full"
                onChange={inputForm}
              />
            </div>
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Skills:</span>
              </label>

              <BadgeInput onBadgesChange={handleBadgesChange} />
            </div>
            <div className="col-span-2">
              <button className="btn btn-outline w-full" onClick={formOnSubmit}>
                Sign Up
              </button>
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
    </React.Fragment>
  );
};
export default authMiddleware(SignUpForm);
