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

  // function logout() {
    // constructor propTypes = {
    //   Cookies: instanceof(Cookies).isReq
    // }
  // }

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    useApiFetch({
      method: "GET",
      url: "/user",
      notify: false,
      success: (res) => {
        setLoggedIn(true);
        setUser(res?.user);
        setLoading(false);
      },
    });
  }
  if (loading) {
    return <div> Loading... </div>;
  }
  return (
    <>
      {!loggedIn ? (
        <>
          <NavLink to="/signin" text="Login" />
          <NavLink to="/signup" text="Sign Up" />
        </>
      ) : (
        <>
          <NavLink to="/profile" text="Profile" />
          <NavLink to="/payment" text="Others" />
          <NavLink to="/adminLogin" text="Admin" />
          <NavLink to="/" text="Log Out" />
        </>
      )}
    </>
  );
};

export default Links;
