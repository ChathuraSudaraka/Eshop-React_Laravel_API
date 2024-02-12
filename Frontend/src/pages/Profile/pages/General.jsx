import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import useApiFetch from "../../../hooks/useApiFetch";
import Cookies from "js-cookie";

const General = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");

  // Validation state variables
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [zipError, setZipError] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Loading effect
  const [loading, setLoading] = useState(true);

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
        setUploadedFile(file); // Set the uploaded file in state
        setChangesMade(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError("First Name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last Name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!mobile) {
      setMobileError("Mobile number is required");
      isValid = false;
    } else {
      setMobileError("");
    }

    if (!zip) {
      setZipError("Zip/Postal code is required");
      isValid = false;
    } else {
      setZipError("");
    }

    return isValid;
  };

  const isValidEmail = (value) => {
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

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setChangesMade(true);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setChangesMade(true);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
    setChangesMade(true);
  };

  const handleUnlockFields = () => {
    setFieldsLocked(false);
  };

  const getUser = async () => {
    try {
      const response = await useApiFetch({
        method: "GET",
        url: "/user",
        success: (data) => {
          console.log("User data:", data);
          if (data && data.user) {
            setFirstName(data.user.fname);
            setLastName(data.user.lname);
            setEmail(data.user.email);
            setMobile(data.user.mobile);
            setAddress(data.user.address);
            setZip(data.user.zip);

            // Save user data to localStorage
            localStorage.setItem("userData", JSON.stringify(data.user));
          } else {
            console.error("Invalid response format:", data);
          }
        },
      });

      if (!response || !response.success) {
        console.error(
          "Error fetching user data:",
          response ? response.error : "No response"
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Image Upload Process here
  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (uploadedFile) {
      // If a new image is uploaded, send it to the server
  
      try {
        const response = await useApiFetch({
          method: "POST",
          url: "/upload-image",
          body: {
            image: uploadedFile,
          },
          success: (data) => {
            console.log("Image upload response:", data);
              console.log("Image uploaded successfully");
              setChangesMade(false);
          },
        })
      } catch (error) {
        console.error("An error occurred during image upload:", error);
        return;
      }
    } else {
      console.log("Form is valid. Submitting...");
      setChangesMade(false);
    }
  };  

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          {loading ? (
            // Loading effect
            <div className="text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="bg-white p-4 border border-gray-400 shadow">
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
                <button type="submit" className="" onClick={handleUpload}>
                  Upload
                </button>
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
                    htmlFor="mobile"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      mobileError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={handleMobileChange}
                    disabled={fieldsLocked}
                  />
                  {mobileError && (
                    <p className="text-red-500 text-sm mt-1">{mobileError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      addressError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={handleAddressChange}
                    disabled={fieldsLocked}
                  />
                  {addressError && (
                    <p className="text-red-500 text-sm mt-1">{addressError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="zip"
                    className="text-base font-titleFont font-semibold px-2"
                  >
                    Zip/Postal Code
                  </label>
                  <input
                    id="zip"
                    className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                      zipError && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Enter your Zip/Postal Code"
                    value={zip}
                    onChange={handleZipChange}
                    disabled={fieldsLocked}
                  />
                  {zipError && (
                    <p className="text-red-500 text-sm mt-1">{zipError}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] mr-4 hover:bg-black duration-300 font-bold ${
                  changesMade ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!changesMade}
                // onClick={handleSubmit}
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default General;
