// Sidebar.js
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdMenu } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { CgPassword } from "react-icons/cg";
import { BiExit } from "react-icons/bi";

const Sidebar = () => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(!isTabletMid);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      {isTabletMid && (
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 max-h-screen z-[998] bg-black/50 ${
            open ? "block" : "hidden"
          } `}
        ></div>
      )}
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className={`bg-gray-900 text-white shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen ${
          isTabletMid ? "md:hidden" : ""
        }`}
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-gray-800 mx-3">
          <img src="" width={45} alt="" />
          <span className="text-xl whitespace-pre">Eshop</span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-sm py-5 flex flex-col gap-1 font-medium">
            <li>
              <NavLink
                to={"/admin"}
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <BsPerson size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>
                  Add Product
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/updateproduct"}
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <CgPassword size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>
                  Update Product
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deleteproduct"
                className={`link flex items-center gap-3 p-4 hover:bg-gray-800 rounded transition-all duration-300 ${
                  isTabletMid ? "text-lg" : ""
                }`}
              >
                <HiOutlineCreditCard size={25} className="min-w-max" />
                <span className={isTabletMid ? "md:inline-block" : ""}>
                  Remove Product
                </span>
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
                <span className={isTabletMid ? "md:inline-block" : ""}>
                  Exit
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className={`absolute w-fit h-fit md:block z-50 ${
            isTabletMid ? "hidden" : "right-2 bottom-3 cursor-pointer"
          }`}
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      {isTabletMid && (
        <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
          <MdMenu size={25} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
