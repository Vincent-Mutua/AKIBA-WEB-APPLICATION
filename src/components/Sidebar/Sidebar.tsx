import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark  p-3 pr-0 position-fixed">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/Dashboard"
            >
              <span data-feather="home"></span>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                 `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/balances"
            >
              <span data-feather="file"></span>
              Balances
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/bills"
            >
              <span data-feather="shopping-cart"></span>
              Bills
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/expenses"
            >
              <span data-feather="users"></span>
              Expenses
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                 `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/goals"
            >
              <span data-feather="bar-chart-2"></span>
              Goals
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/transactions"
            >
              <span data-feather="layers"></span>
              Transactions
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/upload-statement"
            >
              <span data-feather="file"></span>
              Upload Statement
            </NavLink>
          </li>
          <li className="my-4 mb-5 mb-md-6 mb-lg-7 mb-xl-9">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/user-profile"
            >
              <span data-feather="file"></span>
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
