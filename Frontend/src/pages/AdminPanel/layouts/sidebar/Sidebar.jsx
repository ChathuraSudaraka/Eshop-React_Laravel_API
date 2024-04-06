// Sidebar.js
import React from "react";
import {
  FaHome,
  FaShoppingBasket,
} from "react-icons/fa";
import { GiBoxUnpacking, GiUpgrade } from "react-icons/gi";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={` ${
        sidebarToggle ? " hidden " : " block "
      } w-64 bg-white fixed h-[713px] py-4 px-4 ml-2 mt-2 rounded-lg`}
      style={{ transition: "width 0.3s ease" }}
    >
      <div className="my-3 mb-4">
        <h1 className="text-2xl text-black font-bold">ADMIN PANEL</h1>
      </div>
      <hr />
      <ul className="mt-3 text-black font-bold">
        <Link to="/adminpanel">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/adminpanel"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <FaHome className="inline-block w-6 h-6 mr-2" />
            DASHBOARD
          </li>
        </Link>
        <Link to="/addproduct">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/addproduct"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <FaShoppingBasket className="inline-block w-6 h-6 mr-2" />
            ADD PRODUCT
          </li>
        </Link>
        <Link to="/updateproduct">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/updateproduct"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <GiUpgrade className="inline-block w-6 h-6 mr-2" />
            UPDATE PRODUCT
          </li>
        </Link>
        <Link to="/deleteproduct">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/deleteproduct"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <GiBoxUnpacking className="inline-block w-6 h-6 mr-2" />
            REMOVE PRODUCT
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
