import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useApiFetch from "../../hooks/useApiFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sideStatus from "./ShopStatus";
import LeftSide from "./ShopStatus";

const ChangePass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isValidPasswords, setIsValidPasswords] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const otp = queryParams.get("otp");

  const handleNewPasswordChange = (e) => {
    const inputPassword = e.target.value;
    setNewPassword(inputPassword);
    validatePasswords(inputPassword, retypePassword);
  };

  const handleRetypePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setRetypePassword(inputPassword);
    validatePasswords(newPassword, inputPassword);
  };

  const validatePasswords = (password, retype) => {
    // Basic password validation (you can customize this as needed)
    const isPasswordValid = password.length > 6;
    const doPasswordsMatch = password === retype;

    setIsValidPasswords(isPasswordValid && doPasswordsMatch);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // You can use 'email' and 'otp' here
  }, [email, otp]);

  const handlePassword = async () => {
    // Assuming isValidPasswords is a function or variable indicating password validity
    if (isValidPasswords) {
      try {
        const response = await useApiFetch({
          method: "POST",
          url: "/reset-password",
          body: {
            newPassword: newPassword,
            email: email,
            otp: otp,
          },
          success: (data) => {
            // navigate("/correctPass");
            setSuccessMsg("Password changed successfully");
          },
        });
      } catch (error) {
        console.error("Error in change password API call:", error);
      }
    } else {
      // Handle invalid passwords (show an error message, etc.)
      console.error("Invalid passwords");
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
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
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
                <div className="flex flex-col gap-.5">
                  <label
                    htmlFor="newPassword"
                    className="text-base font-semibold text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    className={`w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none ${
                      isValidPasswords ? "border-gray-400" : "border-red-500"
                    } outline-none`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="flex flex-col gap-.5">
                  <label
                    htmlFor="retypePassword"
                    className="text-base font-semibold text-gray-600"
                  >
                    Retype New Password
                  </label>
                  <input
                    id="retypePassword"
                    className={`w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none ${
                      isValidPasswords ? "border-gray-400" : "border-red-500"
                    } outline-none`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Retype new password"
                    value={retypePassword}
                    onChange={handleRetypePasswordChange}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {!isValidPasswords && (
                  <p className="text-sm text-red-500 font-semibold px-4">
                    <span className="font-bold italic mr-1">
                      Passwords do not match or are too short
                    </span>
                  </p>
                )}

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
