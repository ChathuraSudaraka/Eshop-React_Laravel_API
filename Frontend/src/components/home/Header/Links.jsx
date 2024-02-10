import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApiFetch from "../../../hooks/useApiFetch";
import Cookies from "js-cookie";

const NavLink = ({ to, text }) => (
  <Link to={to}>
    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
      {text}
    </li>
  </Link>
);

const Links = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

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
    useApiFetch({
      method: "GET",
      url: "/user",
      notify: false,
      success: (res) => {
        console.log(res?.user);

        setLoggedIn(true);
        setUser(res?.user);
        setLoading(false);

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(res?.user));
      },
    });
  }

  function logout() {
    useApiFetch({
      method: "POST",
      url: "/logout",
      body: {},
      success: () => {
        // Remove user data from local storage
        localStorage.removeItem("user");
        Cookies.remove("token");
        setLoggedIn(false);
      },
    });
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!loggedIn ? (
            <>
              <NavLink to="/signin" text="Login" />
              <NavLink to="/signup" text="Sign Up" />
            </>
          ) : (
            <>
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
                Log Out
              </li>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Links;
