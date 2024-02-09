import React from "react";
import { Link } from "react-router-dom";

const CorrectPass = () => {
  return (
    <div className="flex items-center justify-center content-center h-screen">
      <div className="flex flex-col gap-2 w-full max-w-md p-4">
        <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
          Change Password
        </h1>
        <p>Your Password Change Successfuly</p>
        <Link to="/signin">
          <button className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CorrectPass;
