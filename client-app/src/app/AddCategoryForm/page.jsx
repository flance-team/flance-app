"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";

const AddCategoryForm = () => {
   const base_url_server = "http://localhost:3000";
   const backgroundImage = "../assets/AddCategoryForm.jpg";

   const [formValue, setFormValue] = useState({
      name: "",
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
      const headers = {
         Accept: "application/json, text/plain, */*",
         "Content-Type": "application/json",
         access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU3ODEwOTd9.gOZst1XQIdYcUJAEvjM-al_XJBW8GR9DGeSoXwGkTwk",
      };
      const response = await axios.post(`${base_url_server}/admins/addcategory`, formValue, {
         headers,
      });
      console.log(response);
   };

   return (
      <React.Fragment>
         <Layout />
         {/* <div
        className="h-screen w-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      > */}
         <div className="bg-white rounded-lg shadow-md m-2 p-2">
            <h1 className="text-3xl w-auto">Create Category</h1>
            <form className="w-auto">
               <div className="md:w-1/4">
                  <div className="form-control mb-4">
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700">
                        Name:
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        onChange={inputForm}
                     />
                  </div>
                  <button
                     type="submit"
                     className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer w-full t-2"
                     onClick={formOnSubmit}>
                     SUBMIT
                  </button>
               </div>
            </form>
         </div>
         {/* </div> */}
      </React.Fragment>
   );
};

export default AddCategoryForm;
