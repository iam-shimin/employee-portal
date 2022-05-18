import React from "react";
import ReactDOM from "react-dom";

import employeeService from "../../common/services";
import "./index.css";

/**
 * @typedef {import('../../common/services').Employee} Employee
 */

/**
 *
 * @param {{data: Employee}} param0
 * @returns
 */
const EmployeeDetails = ({ data }) =>
  data ? (
    <div>
      <div>Username: {data.username}</div>
      <div>Role: {data.role}</div>
      <div>Birthday: {data.dob}</div>
    </div>
  ) : (
    "Please Select a User!"
  );

export { EmployeeDetails };

export default () => {
  ReactDOM.render(<EmployeeDetails />, document.getElementById("app"));
};
