import React, { useState } from "react";
import ForgotPassModal from "./Modal/OTPModal";
import useApiFetch from "../../hooks/useApiFetch";
import LeftSide from "../../components/Account/ShopStatus";

const FPASS = () => {
  // ============= Initial State Start here =============
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true); // Set loading state to true
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
      } finally {
        setIsLoading(false); // Set loading state to false, whether the API call succeeds or fails
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <LeftSide />
      <div className="w-full lgl:w-1/2 h-full">
        <div className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
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
              className="w-full mb-3 h-10 px-3 placeholder-text-sm placeholder-tracking-wide text-base font-medium placeholder-font-normal rounded-md border-[1px] border-gray-400 outline-none"
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
              {isLoading ? "Loading..." : "Continue"}
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
      </div>
    </div>
  );
};

export default FPASS;
