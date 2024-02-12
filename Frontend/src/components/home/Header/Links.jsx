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
  const [user, setUser] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setLoggedIn(true);
      setUser(storedUser);
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
        console.log(res?.user);

        setLoggedIn(true);
        setUser(res?.user);

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
          {user.role_id === 1 && (
            <>
              <NavLink to="/profile" text="Admin Profile" />
              <NavLink to="/admin" text="Admin Panel" />
              <NavLink to="/payment" text="Admin Other" />
            </>
          )}
          {user.role_id === 2 && <NavLink to="/profile" text="Profile" />}
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
