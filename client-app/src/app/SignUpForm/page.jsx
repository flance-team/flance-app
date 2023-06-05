"use client";
//signup User
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const base_url_server = "http://localhost:3000";
const SignUpForm = () => {
  const router = useRouter();
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
  console.log(selectedValues, "Here");
  // for (let i = 0; i < selectedValues.length; i++) {
  //   for (let j = 0; j < dataSkill.length; j++) {
  //     if (selectedValues[i] === dataSkill[j]) {
  //       console.log(selectedValues[0], dataSkill[0], "ini");
  //       setSkill(dataSkill[i]);
  //     }
  //   }
  // }
  console.log(skill, "list skill");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    address: "",
    phoneNumber: "",
    gender: "",
  });
  const inputForm = (el) => {
    setFormValue({
      ...formValue,
      [el.target.name]: el.target.value,
    });
  };
  const formOnSubmit = async (el) => {
    el.preventDefault();
    const response = await axios.post(`${base_url_server}/users`, formValue);
    const inputSkills = await axios.post(`${base_url_server}/users/addSkills`, {
      skills: selectedValues,
    });
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (!selectedValues.includes(selectedValue)) {
      setSelectedValues([...selectedValues, selectedValue]);
    }
    // for (let i = 0; i < selectedValues.length; i++) {
    //   for (let j = 0; j < dataSkill.length; j++) {
    //     if (selectedValues[i] === dataSkill[j]) {
    //       console.log(selectedValues[0], dataSkill[0], "ini");
    //       setSkill(dataSkill[i]);
    //     }
    //   }
    // }
  };

  useEffect(() => {
    dataSkills();
  }, []);
  return (
    <React.Fragment>
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
              <label htmlFor="selectInput" className="block text-gray-700">
                Select an option:
              </label>
              <select
                id="selectInput"
                onChange={handleChange}
                name="skills"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">-- Select --</option>
                {dataSkill?.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
              <div className="mt-2">
                <p>Selected values:</p>
                <ul>
                  {selectedValues.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
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
export default SignUpForm;
