// import React, { useState } from "react";
//user Login Form
import Image from "next/image";
const SignUpForm = () => {
  // const [formValue, setFormValue] = useState({
  //   email: "",
  //   password: "",
  // });
  // const inputForm = (el) => {
  //   setFormValue({
  //     ...formValue,
  //     [el.target.name]: el.target.value,
  //   });
  // };
  // const formOnSubmit = (el) => {
  //   el.preventDefault();

  //   const response = JSON.stringify(formValue);
  // };
  return (
    <>
      <div className="flex flex-row ">
        <div className="flex-initial w-6/12 h-5/6">
          <img src="./LoginPicUser.jpg" className="" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-end">
            <div className="flex flex-end mr-4">Already have an account?</div>
            <div>
              <button className="btn btn-outline">SignIn</button>
            </div>
          </div>
          <div className="mt-3">
            <div>Welcome to Flance!</div>
            <div>Please register your account</div>
          </div>
          <div className="mt-3">
            <form>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="email"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Full Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Phone Number:</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Gender:</span>
                </label>
                <select className="select select-bordered">
                  <option defaultValue>Pick one</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Address:</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Address"
                ></textarea>
              </div>
              <button className="btn btn-outline mt-5 w-full">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
