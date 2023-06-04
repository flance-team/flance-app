import React from "react";
import "./AddScheduleForm.css";

const AddScheduleForm = () => {
  return (
    <React.Fragment>
      <div className="navbar">
        <div className="navbar-logo">
          <img src="../assets/logo.png" alt="Logo" />
          <span>Logo</span>
        </div>
        <ul className="navbar-menu">
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
      <div className="container">
        <h1>Add Schedule</h1>
        <form>
          <div className="form-group">
            <label htmlFor="day">Day:</label>
            <input type="text" id="day" name="day" placeholder="Enter day" />
          </div>
          <div className="form-group">
            <label htmlFor="startHour">Start Hour:</label>
            <input
              type="text"
              id="startHour"
              name="startHour"
              placeholder="Enter start hour"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalHour">Total Hour:</label>
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

// module.exports = AddScheduleForm;
export default AddScheduleForm;
