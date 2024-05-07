// Sidebar.js
import React from "react";
import {
  FaDoorClosed,
  FaHome,
  FaShoppingBasket,
  FaTrashAlt,
} from "react-icons/fa";
import { GiBoxUnpacking, GiUpgrade } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProfileSidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={` ${
        sidebarToggle ? " hidden " : " block "
      } w-64 bg-white fixed py-4 px-4 ml-2 mt-2 rounded-lg`}
      style={{ transition: "width 0.3s ease" }}
    >
      <div className="my-3 mb-4">
        <h1 className="text-2xl text-black font-bold"></h1>
      </div>
      <hr />
      <ul className="mt-3 text-black font-bold">
        <Link to="/general">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/general"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <FaHome className="inline-block w-6 h-6 mr-2" />
            GENERAL
          </li>
        </Link>
        <Link to="/settings">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/settings"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <RiSettings3Fill className="inline-block w-6 h-6 mr-2" />
            SETTINGS
          </li>
        </Link>
        <Link to="/Managepayment">
          <li
            className={`mb-2 rounded hover:shadow border hover:border-blue-600 py-2 px-2 ${
              window.location.pathname === "/Managepayment"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            <MdPayment className="inline-block w-6 h-6 mr-2" />
            PAYMENT
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
