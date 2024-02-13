import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import useApiFetch from "../../../hooks/useApiFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { FaCamera } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import CustomInput from "../layouts/Inputs";
import CustomButton from "../layouts/Button";

const General = () => {
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(
    "https://www.shopavenue.co.za/wp-content/uploads/2018/08/banner-1024x390.jpg"
  );
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  // Navigate to the home page if the user is not logged in
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigateTo("/signin");
    }

    // Get user data
    getUser();
  }, []);

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
        });
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
    <div
      className={`flex ${
        isMobile ? "flex-col" : "xl:h-screen sm:flex"
      } overflow-hidden bg-gray-100`}
    >
      <Sidebar className="fixed-top" />
      <main className="flex-1 p-4 md:order-2 overflow-y-auto">
        <div className="mx-auto">
          <div className="relative h-48 md:h-80 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={coverImage}
              alt="Cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="bg-white p-4 border border-gray-400 shadow rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="rounded-full overflow-hidden w-32 h-32 border-4 border-white">
                    <img
                      className="w-full h-full object-cover"
                      src={image || "https://via.placeholder.com/150"}
                      alt="Profile"
                    />
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-0 right-0 bg-gray-300 p-2 rounded-full cursor-pointer"
                  >
                    <FaCamera className="text-gray-600" />
                  </label>
                  <input
                    id="file-upload"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-lg font-bodyFont px-4 py-2 rounded-md hover:bg-blue-700 duration-300"
                  onClick={handleUpload}
                >
                  Upload
                </button>
                <div>
                  <h3 className="text-2xl font-semibold">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* First Namw */}
                <CustomInput
                  labelText={"First Name"}
                  value={firstName}
                  onChange={handleNameChange}
                  placeholder={"Enter your first name"}
                  disabled={fieldsLocked}
                  error={firstNameError}
                />
                {/* Last Name */}
                <CustomInput
                  labelText={"Last Name"}
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder={"Enter your last name"}
                  disabled={fieldsLocked}
                  error={lastNameError}
                />
                {/* Email */}
                <CustomInput
                  labelText={"Email"}
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={"Enter your email"}
                  disabled={fieldsLocked}
                  error={emailError}
                />
                {/* Mobile */}
                <CustomInput
                  labelText={"Mobile Number"}
                  value={mobile}
                  onChange={handleMobileChange}
                  placeholder={"Enter your mobile number"}
                  disabled={fieldsLocked}
                  error={mobileError}
                />
                {/* Address */}
                <CustomInput
                  labelText={"Address"}
                  value={address}
                  onChange={handleAddressChange}
                  placeholder={"Enter your address"}
                  disabled={fieldsLocked}
                  error={addressError}
                />
                {/* Zip */}
                <CustomInput
                  labelText={"Zip/Postal Code"}
                  value={zip}
                  onChange={handleZipChange}
                  placeholder={"Enter your Zip/Postal Code"}
                  disabled={fieldsLocked}
                  error={zipError}
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                {/* Save Button */}
                <CustomButton
                  Text={"Save"}
                  textColor="text-white"
                  Fsize="text-lg"
                  className={`hover:bg-black duration-300 font-bold px-8 py-3
                  ${changesMade ? "" : "opacity-50 cursor-not-allowed"}`}
                />
                {/* Update Button */}
                <CustomButton
                  onClick={handleUnlockFields}
                  Text={"Update"}
                  textColor="text-black"
                  bgColor="bg-blue-500"
                  Fsize="text-lg"
                  className={
                    "hover:bg-blue-700 duration-300 font-bold px-8 py-3"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default General;
