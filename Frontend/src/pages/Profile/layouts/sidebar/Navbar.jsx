// Navbar.js
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Fa500Px,
  FaBars,
  FaBell,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className="pr-2 pl-2">
      <nav className="bg-white px-4 py-3 flex justify-between rounded-lg mt-2 ">
        <div className="flex items-center text-xl">
          <FaBars
            className="text-black me-4 cursor-pointer"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          />
        </div>
        <div className="flex items-center gap-x-5">
          <Link to="/changePassword">
            <button className="text-black">
              <FaBell className="w-6 h-6" />
            </button>
          </Link>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="content">
                <FaUserCircle
                  className="-mr-1 h-7 w-7 text-black hover:text-blue-800 duration-300"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={"/general"}>
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex gap-2 px-4 py-2 text-sm"
                          )}
                        >
                          {" "}
                          <span>
                            <AiOutlineUser className="text-xl" />
                          </span>
                          PROFILE
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={"/settings"}>
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex gap-2 px-4 py-2 text-sm"
                          )}
                        >
                          {" "}
                          <span>
                            <AiOutlineSetting className="text-xl" />
                          </span>
                          SETTINGS
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={"/"}>
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex gap-2 px-4 py-2 text-sm"
                          )}
                        >
                          {" "}
                          <span>
                            <IoIosLogOut className="text-xl" />
                          </span>
                          EXIT
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;