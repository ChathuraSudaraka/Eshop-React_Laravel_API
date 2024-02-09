import React, { useState } from "react";
import ForgotPassModal from "./Modal/ForgotPasswordModal";
import useApiFetch from "../../hooks/useApiFetch";

const FPASS = () => {
  // ============= Initial State Start here =============
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  // ============= Error msg Start here =============
  const [errEmail, setErrEmail] = useState("");

  const handleEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setErrEmail("");

    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (enteredEmail.trim() !== "" && !emailRegex.test(enteredEmail)) {
      setErrEmail("Enter a valid email address");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrEmail("Enter your email");
    } else if (!emailRegex.test(email)) {
      setErrEmail("Enter a valid email address");
    } else {
      setErrEmail(""); // Clear the error message if the email is valid
      try {
        const response = await useApiFetch({
          method: "POST",
          url: "/forgot-password",
          body: {
            email: email,
          },
          success: (data) => {
            console.log("Success:", data);
            openModal();
          },
        });
      } catch (error) {
        console.error("Error in forgot password API call:", error);
      }
    }
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
          onChange={handleEmail}
        />
        {errEmail && (
          <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
            <span className="font-bold italic mr-1">!</span>
            {errEmail}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="bg-primeColor hover:bg-black text-gray-200 hover:text-white w-full h-10 rounded-md duration-300"
        >
          Continue
        </button>
      </div>
      {isModalOpen && (
        <ForgotPassModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          email={email}
        />
      )}
    </div>
  );
};

export default FPASS;
