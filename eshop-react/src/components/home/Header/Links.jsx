import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApiFetch from "../../../hooks/useApiFetch";

const NavLink = ({ to, text }) => (
  <Link to={to}>
    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
      {text}
    </li>
  </Link>
);

const Links = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoggedIn(true);
        setUser(res?.user);
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res?.user));
      },
      error: () => {
        setLoading(false);
      },
    });
  }

  if (loading) {
    return <p>Loading...</p>;
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
        </>
      )}
    </>
  );
};

export default Links;
