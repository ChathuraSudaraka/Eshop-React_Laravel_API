import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isValidPasswords, setIsValidPasswords] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

  const openModal = () => {
    // You can check isValidPasswords before opening the modal
    if (isValidPasswords) {
      // Open modal logic here
    }
  };

  return (
    <div className="flex items-center justify-center content-center h-screen">
      <div className="flex flex-col gap-2 w-full max-w-md p-4">
        <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
          Change Password
        </h1>
        <label
          htmlFor="newPassword"
          className="text-base font-semibold text-gray-600"
        >
          New Password
        </label>
        <div className="relative">
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

        <label
          htmlFor="retypePassword"
          className="text-base font-semibold text-gray-600"
        >
          Retype New Password
        </label>
        <div className="relative">
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
          onClick={openModal}
          className={`bg-primeColor hover:bg-black text-gray-200 hover:text-white w-full h-10 rounded-md duration-300 ${
            isValidPasswords ? "" : "cursor-not-allowed opacity-50"
          }`}
          disabled={!isValidPasswords}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ChangePass;
