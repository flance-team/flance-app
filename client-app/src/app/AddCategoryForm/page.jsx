import React from "react";
import "./AddCategoryForm.css";

const AddCategoryForm = () => {
   return (
      <React.Fragment>
         <div class="navbar">
            <div class="navbar-logo">
               <img
                  src="../assets/logo.png"
                  alt="Logo"
               />
            </div>
            <ul class="navbar-menu">
               <li>
                  <a href="#">Menu 1</a>
               </li>
               <li>
                  <a href="#">Menu 2</a>
               </li>
               <li>
                  <a href="#">Menu 3</a>
               </li>
            </ul>
         </div>
         <div class="container">
            <h1>Add New Category</h1>
            <form>
               <div class="form-group">
                  <label for="company-name">Company Name:</label>
                  <input
                     type="text"
                     id="company-name"
                     name="company-name"
                     placeholder="Enter Company Name"
                  />
               </div>
               <input
                  type="submit"
                  value="Submit"
               />
            </form>
         </div>
      </React.Fragment>
   );
};

module.exports = AddCategoryForm;
