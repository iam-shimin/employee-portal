import React from "react";
import ReactDOM from "react-dom";

import employeeService from "../../common/services";
import "./index.css";

/**
 * @typedef {import('../../common/services').Employee} Employee
 */

const EmployeeList = ({ onItemSelect }) => {
  const [list, setList] = React.useState(/** @type {Employee[]} */ ([]));

  React.useEffect(() => {
    employeeService
      .findAll()
      .then(setList)
      .catch(() => {
        alert("Failed to load Employees!");
      });
  });

  return (
    <ul>
      {list.map((emp) => (
        <li key={emp.id}>
          <button className="list-item" onClick={() => onItemSelect(emp)}>
            <span className="username">{emp.username}</span>
            <span>Role: {emp.role}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export { EmployeeList };

export default () => {
  ReactDOM.render(<EmployeeList />, document.getElementById("app"));
};
