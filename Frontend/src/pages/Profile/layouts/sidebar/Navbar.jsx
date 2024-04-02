import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <nav className="bg-white px-4 py-3 rounded-lg flex justify-between">
      <div className="flex items-center text-xl">
        <FaBars
          className="text-black me-4 cursor-pointer"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
      </div>
      <div className="flex items-center gap-x-5">
        <div className="text-black">
          <FaBell className="w-6 h-6" />
        </div>

        <div className="relative">
          <button className="text-black group">
            <FaUserCircle className="w-6 h-6 mt-1" />
            <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul className="py-2 text-sm text-gray-950">
                <li>
                  <Link to={"/profile"} className="text-lg">
                    Profile
                  </Link>
                </li>
                <li>
                  <a href="" className="text-lg">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="" className="text-lg">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
