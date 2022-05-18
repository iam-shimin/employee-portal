import React from "react";
import ReactDOM from "react-dom";

import { RegistrationPage } from "signup/Container";
import { EmployeeList } from "employees/Container";
import { EmployeeDetails } from "employee/Container";

import "./index.css";

const App = () => {
  const [activePage, setActivePage] = React.useState({
    id: "list",
    payload: null,
  });

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  function handleNaviation(e) {
    const { navId } = e.currentTarget.dataset;
    setActivePage({ id: navId, payload: null });
  }

  function handleEmployeeSelection(employee) {
    setActivePage({ id: "details", payload: employee });
  }

  function handleDefaultNavigation() {
    setActivePage({ id: "registration", payload: null });
  }

  return (
    <main>
      <header>
        <h1>Employee Management</h1>
        <nav>
          <ul className="header-nav">
            <li>
              <button
                disabled={activePage.id === "list"}
                data-nav-id="list"
                onClick={handleNaviation}
              >
                Employee List
              </button>
            </li>
            <li>
              <button
                disabled={activePage.id === "registration"}
                data-nav-id="registration"
                onClick={handleNaviation}
              >
                Registration
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {activePage.id === "registration" && <RegistrationPage />}
      {activePage.id === "list" && (
        <EmployeeList
          onEmptyList={handleDefaultNavigation}
          onItemSelect={handleEmployeeSelection}
        />
      )}
      {activePage.payload && (
        <EmployeeDetails data={activePage.payload ? activePage.payload : {}} />
      )}
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
