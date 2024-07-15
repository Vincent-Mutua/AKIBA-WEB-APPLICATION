import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFileAlt, FaShoppingCart, FaChartBar, FaLayerGroup, FaUpload, FaUser } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark p-3 pr-0 position-fixed">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/dashboard"
            >
              <FaHome className="me-2" />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/statistics"
            >
              <FaFileAlt className="me-2" />
              Statistics
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/bills"
            >
              <FaShoppingCart className="me-2" />
              Bills
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 py-2 text-light ${isActive ? 'active bg-success rounded p-2' : ''}`
              }
              to="/goals"
            >
              <FaChartBar className="me-2" />
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
              <FaLayerGroup className="me-2" />
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
              <FaUpload className="me-2" />
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
              <FaUser className="me-2" />
              Profile
            </NavLink>
          </li>
          <br />
          <br />
          <br />
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
