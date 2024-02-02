import React, { useState } from "react";
import ForgotPassModal from "./Modal/ForgotPasswordModal";

const FPASS = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-2 w-full max-w-md p-4">
        <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
          Forgot Password
        </h1>
        <label
          htmlFor="email"
          className="text-base font-semibold text-gray-600"
        >
          Email
        </label>
        <input
          id="email"
          className="w-full h-10 px-3 placeholder-text-sm placeholder-tracking-wide text-base font-medium placeholder-font-normal rounded-md border-[1px] border-gray-400 outline-none"
          type="email"
          placeholder="john@workemail.com"
          value={email}
          onChange={handleEmailChange}
        />
        <p className="text-sm text-red-500 font-semibold px-4">
          <span className="font-bold italic mr-1">!</span>
        </p>
        <button
          onClick={openModal}
          className="bg-primeColor hover:bg-black text-gray-200 hover:text-white w-full h-10 rounded-md duration-300"
        >
          Continue
        </button>
      </div>
      {isModalOpen && <ForgotPassModal closeModal={closeModal} />}
    </div>
  );
};

export default FPASS;
