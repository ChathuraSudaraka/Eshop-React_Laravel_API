import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import useApiFetch from "../../../hooks/useApiFetch";

const General = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Validation state variables
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // State to track whether changes are made
  const [changesMade, setChangesMade] = useState(false);

  // State to track whether fields are locked
  const [fieldsLocked, setFieldsLocked] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setChangesMade(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let isValid = true;

    // Validate First Name
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate Last Name
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Validate Email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const isValidEmail = (value) => {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleNameChange = (e) => {
    setFirstName(e.target.value);
    setChangesMade(true);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setChangesMade(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setChangesMade(true);
  };

  const handleUnlockFields = () => {
    setFieldsLocked(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Perform the form submission logic here
      console.log("Form is valid. Submitting...");
      setChangesMade(false); // Reset changesMade state after submission
    } else {
      console.log("Form is invalid. Please check the errors.");
    }
  };

  const useEffect = async () => {
    try {
      // Fetch user data from an API
      const response = await useApiFetch({
        method: "GET",
        url: "/user",
        success: (data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="bg-white p-4 border border-gray-400 shadow">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <label htmlFor="image" className="cursor-pointer">
                    {image ? (
                      <img
                        src={image}
                        alt="User"
                        className="h-20 w-20 border border-gray-700 object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 text-lg">Upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      firstNameError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={handleNameChange}
                    disabled={fieldsLocked}
                  />
                  {firstNameError && (
                    <p className="text-red-500 text-sm mt-1">
                      {firstNameError}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      lastNameError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    disabled={fieldsLocked}
                  />
                  {lastNameError && (
                    <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      emailError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={fieldsLocked}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="mobile"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      emailError && "border-red-500"
                    }`}
                    type="number"
                    placeholder="Enter your mobile number"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={fieldsLocked}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Address
                  </label>
                  <input
                    id="email"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      emailError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your Address"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={fieldsLocked}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      emailError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your current city"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={fieldsLocked}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Country
                  </label>
                  <select
                    id="city"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      emailError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your current city"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={fieldsLocked}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Zip/Postal code
                  </label>
                  <input
                    id="email"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      emailError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your Zip/Postal code"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={fieldsLocked}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] mr-4 hover:bg-black duration-300 font-bold ${
                  changesMade ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!changesMade}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleUnlockFields}
                className="bg-blue-500 text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-blue-700 duration-300 font-bold"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default General;
