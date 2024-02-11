import React, { useState } from "react";
import { Link } from "react-router-dom";
import useApiFetch from "@/hooks/useApiFetch";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LeftSide from "./ShopStatus";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  // ============= Initial State Start here =============
  const [clientFName, setClientFName] = useState("");
  const [clientLName, setClientLName] = useState("");
  const [email, setEmail] = useState("");
  const [gend, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientFName, setErrClientFName] = useState("");
  const [errClientLName, setErrClientLName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errGender, setErrGender] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errMobile, setErrMobile] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleFName = (e) => {
    setClientFName(e.target.value);
    setErrClientFName("");
  };
  const handleLName = (e) => {
    setClientLName(e.target.value);
    setErrClientLName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setErrMobile("");
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientFName) {
        setErrClientFName("Enter your first name");
      }
      if (!clientLName) {
        setErrClientLName("Enter your last name");
      }
      if (!gend) {
        setErrGender("Select the Gender");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!mobile) {
        setErrMobile("Enter your mobile number");
      } else {
        if (mobile.length < 10) {
          setErrMobile("Enter a valid mobile number");
        }
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }
      // ============== Getting the value ==============
      if (
        clientFName &&
        clientLName &&
        gend &&
        email &&
        EmailValidation(email) &&
        mobile &&
        password &&
        password.length >= 6
      ) {
        await useApiFetch({
          method: "POST",
          url: "/register",
          body: {
            fname: clientFName,
            lname: clientLName,
            gender_gender_id: gend,
            email: email,
            mobile: mobile,
            password: password,
          },
          success: (data) => {
            setSuccessMsg(
              `Hello dear ${clientFName}, Welcome you to Eshop Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
            );
            setClientFName("");
            setClientLName("");
            setGender("");
            setEmail("");
            setMobile("");
            setPassword("");
          },
        });
      }
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LeftSide/>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    First Name
                  </p>
                  <input
                    onChange={handleFName}
                    value={clientFName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errClientFName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientFName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Last Name
                  </p>
                  <input
                    onChange={handleLName}
                    value={clientLName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errClientLName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientLName}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="inline-flex justify-between gap-2">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Gender
                  </p>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={1}
                      defaultChecked={gend}
                      onChange={handleGenderChange}
                      className="mr-1"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={2}
                      defaultChecked={gend}
                      onChange={handleGenderChange}
                      className="mr-1"
                    />
                    Female
                  </label>
                  {errGender && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errGender}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Mobile
                  </p>
                  <input
                    onChange={handleMobile}
                    value={mobile}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 070 XXX XXXX"
                  />
                  {errMobile && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errMobile}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5 relative">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer absolute top-10 right-3 transform -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Eshop{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  I have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
