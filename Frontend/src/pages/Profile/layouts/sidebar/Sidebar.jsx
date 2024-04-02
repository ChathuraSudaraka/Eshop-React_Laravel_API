// Sidebar.js
import React from "react";
import { FaHome, FaMeteor } from "react-icons/fa";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? " hidden " : " block "} pr-2`}>
      <div className="w-64 bg-white fixed h-[713px] px-4 py-2 rounded-lg">
        <div className="my-2 mb-4">
          <h1 className="text-2xl text-black font-bold">Admin Panel</h1>
        </div>
        <hr />
        <ul className="mt-3 text-black font-bold">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <a href="" className="px-3">
              <FaMeteor className="inline-block w-6 h-6 mr-2 "></FaMeteor>
              Dashboard
            </a>
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <a href="" className="px-3">
              <FaHome className="inline-block w-6 h-6 mr-2"></FaHome>
              Home
            </a>
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <a href="" className="px-3">
              <FaHome className="inline-block w-6 h-6 mr-2"></FaHome>
              Home
            </a>
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <a href="" className="px-3">
              <FaHome className="inline-block w-6 h-6 mr-2"></FaHome>
              Home
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

/* <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-sm py-5 flex flex-col gap-1 font-medium">
            <li>
              <NavLink
                to={"/profile"}
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <BsPerson size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>General</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/changePassword"}
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <CgPassword size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>Change Password</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/paymentMethod"
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <HiOutlineCreditCard size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>Payment Method</span>
              </NavLink>
            </li>
            {!isTabletMid && <div className="nav-split"></div>}
            <li>
              <NavLink
                to="/"
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <BiExit size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>Exit</span>
              </NavLink>
            </li>
          </ul>
        </div> */
