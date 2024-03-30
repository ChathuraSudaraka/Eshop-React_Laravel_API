import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApiFetch from "../../../hooks/useApiFetch";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";

const NavLink = ({ to, text }) => (
  <Link to={to}>
    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
      {text}
    </li>
  </Link>
);

const Links = () => {
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setLoggedIn(true);
      setRole(storedUser.role); // Set role from stored user
      setLoading(false);
    } else {
      getUser();
    }
  }, []);

  function getUser() {
    setLoading(true);
    useApiFetch({
      method: "GET",
      url: "/user",
      notify: false,
      success: (res) => {
        setLoggedIn(true);
        setRole(res?.user.role); // Set role from fetched user
        localStorage.setItem("user", JSON.stringify(res?.user));
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });
  }

  function logout() {
    setLogoutLoading(true);

    useApiFetch({
      method: "POST",
      url: "/logout",
      body: {},
      success: () => {
        localStorage.removeItem("user");
        Cookies.remove("token");
        setLoggedIn(false);
        setLogoutLoading(false);
        navigateTo("/signin");
      },
      error: () => {
        setLogoutLoading(false);
      },
    });
  }

  return (
    <>
      {loggedIn ? (
        <>
          {loading && (
            <div className="loading-indicator">
              <CircularProgress size="24px" color="primary" />
            </div>
          )}
          {role === 'admin' ? ( // Check if user is admin
            <>
              <NavLink to="/profile" text="Admin Profile" />
              <NavLink to="/admin" text="Admin Panel" />
              <NavLink to="/payment" text="Admin Other" />
            </>
          ) : (
            <>
              <NavLink to="/profile" text="Profile" /> {/* Regular user option */}
            </>
          )}
          <li
            className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
            onClick={logout}
          >
            {logoutLoading ? "Logging Out..." : "Log Out"}
          </li>
        </>
      ) : (
        <>
          <NavLink to="/signin" text="Login" />
          <NavLink to="/signup" text="Sign Up" />
        </>
      )}
    </>
  );
};

export default Links;
