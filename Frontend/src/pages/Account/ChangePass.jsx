import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useApiFetch from "../../hooks/useApiFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LeftSide from "./ShopStatus";

const ChangePass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isValidPasswords, setIsValidPasswords] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errNewPassword, setErrNewPassword] = useState("");
  const [errRetypePassword, setErrRetypePassword] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const otp = queryParams.get("otp");

  const navigateTo = useNavigate();
  useEffect(() => {
    if (!email) {
      navigateTo("/forgotpassword");
    }
    if (!otp) {
      navigateTo("/forgotpassword");
    }
  }, [navigateTo]);

  const handleNewPasswordChange = (e) => {
    const inputPassword = e.target.value;
    setNewPassword(inputPassword);
    setErrNewPassword("");
    validatePasswords(inputPassword, retypePassword);
  };

  const handleRetypePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setRetypePassword(inputPassword);
    setErrRetypePassword("");
    validatePasswords(newPassword, inputPassword);
  };

  const validatePasswords = (password, retype) => {
    // Basic password validation (you can customize this as needed)
    const isPasswordValid = password.length > 6;
    const doPasswordsMatch = password === retype;

    setIsValidPasswords(isPasswordValid && doPasswordsMatch);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  const handlePassword = async () => {
    // Validate new password
    if (!newPassword) {
      setErrNewPassword("Enter new password");
    } else if (newPassword.length < 6) {
      setErrNewPassword("Password must be at least 6 characters");
    }

    // Validate retype password
    if (!retypePassword) {
      setErrRetypePassword("Retype new password");
    } else if (retypePassword !== newPassword) {
      setErrRetypePassword("Passwords do not match");
    }

    // If both passwords are valid, make API call
    if (isValidPasswords) {
      try {
        const response = await useApiFetch({
          method: "POST",
          url: "/reset-password",
          body: {
            newPassword: newPassword,
            email: email,
            otps: otp,
          },
          success: (data) => {
            setSuccessMsg("Password changed successfully");
          },
        });
      } catch (error) {
        console.error("Error in change password API call:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LeftSide />
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Change Password
              </h1>
              <div className="flex flex-col gap-3">
                {/* New Password */}
                <div className="flex flex-col gap-.5 relative">
                  <label
                    htmlFor="newPassword"
                    className="text-base font-semibold text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    className={`w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none ${
                      errNewPassword ? "border-red-500" : "border-gray-400"
                    }`}
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  <span
                    onClick={toggleNewPasswordVisibility}
                    className="absolute right-3 top-8 cursor-pointer"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errNewPassword && (
                    <p className="text-sm text-red-500 font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errNewPassword}
                    </p>
                  )}
                </div>
                {/* Retype New Password */}
                <div className="flex flex-col gap-.5 relative">
                  <label
                    htmlFor="retypePassword"
                    className="text-base font-semibold text-gray-600"
                  >
                    Retype New Password
                  </label>
                  <input
                    id="retypePassword"
                    className={`w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none ${
                      errRetypePassword ? "border-red-500" : "border-gray-400"
                    }`}
                    type={showRetypePassword ? "text" : "password"}
                    placeholder="Retype new password"
                    value={retypePassword}
                    onChange={handleRetypePasswordChange}
                  />
                  <span
                    onClick={toggleRetypePasswordVisibility}
                    className="absolute right-3 top-8 cursor-pointer"
                  >
                    {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errRetypePassword && (
                    <p className="text-sm text-red-500 font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errRetypePassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handlePassword}
                  className={`bg-primeColor hover:bg-black text-gray-200 hover:text-white w-full h-10 rounded-md duration-300 ${
                    isValidPasswords ? "" : "cursor-not-allowed opacity-50"
                  }`}
                  disabled={!isValidPasswords}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePass;
