import React from "react";
import "./CreateJobForm.css";

const CreateJobForm = () => {
  return (
    <React.Fragment>
      <div class="navbar">
        <div class="navbar-logo">
          <img src="../assets/logo.png" alt="Logo" />
          <span>Logo</span>
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
        <h1>Add Schedule</h1>
        <form>
          <div class="form-group">
            <label for="day">Day:</label>
            <input type="text" id="day" name="day" placeholder="Enter day" />
          </div>
          <div class="form-group">
            <label for="startHour">Start Hour:</label>
            <input
              type="text"
              id="startHour"
              name="startHour"
              placeholder="Enter start hour"
            />
          </div>
          <div class="form-group">
            <label for="totalHour">Total Hour:</label>
            <input
              type="text"
              id="totalHour"
              name="totalHour"
              placeholder="Enter total hour"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </React.Fragment>
  );
};

// module.exports = CreateJobForm;
export default CreateJobForm;
