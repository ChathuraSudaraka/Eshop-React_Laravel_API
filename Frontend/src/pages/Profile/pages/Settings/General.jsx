import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { FaCamera } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { IoIosSave, IoIosUnlock } from "react-icons/io";
import useApiFetch from "../../../../hooks/useApiFetch";
import { PrimaryInput } from "../../layouts/Inputs";
import CustomButton from "../../layouts/Button";
import DefaultLayout from "../../layouts/DefaultLayout";

const General = () => {
  const [image, setImage] = useState();
  const [coverImage, setCoverImage] = useState(
    "https://www.shopavenue.co.za/wp-content/uploads/2018/08/banner-1024x390.jpg"
  );
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [emailDisabled, setEmailDisabled] = useState(true);

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
  const disableEmailField = () => {
    setEmailDisabled(true);
  };

  // Function to enable the email field
  const enableEmailField = () => {
    setEmailDisabled(false);
  };

  useEffect(() => {
    disableEmailField();
  }, []);

  // Fetch user data here
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
            setAddress(data.user.address.line);
            setZip(data.user.address.postal_code);
            setImage(
              `http://localhost:8000/storage/profile_images/${data.user.profile_img}`
            );

            if (data.image?.profile_img) {
              // If there is an image path, set uploadedFile to null
              setUploadedFile(null);
            }
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
    try {
      e.preventDefault();

      // Assuming validate function checks the form validity
      if (!validate()) {
        console.log("Form is not valid. Aborting submission.");
        return;
      }

      if (uploadedFile) {
        try {
          const response = await useApiFetch({
            method: "POST",
            url: "/upload-image",
            body: {
              image: uploadedFile,
            },
            success: (data) => {
              toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              console.log("Image upload response:", data);
              console.log("Image uploaded successfully");
              setChangesMade(false);
            },
          });

          // Ensure the response indicates success (adjust based on your API)
          if (response.success) {
            setChangesMade(false);
          } else {
            console.error("Image upload failed:", response.error);
          }
        } catch (error) {
          console.error("An error occurred during image upload:", error);
          return;
        }
      }

      try {
        const userUpdateResponse = await useApiFetch({
          method: "POST", // Use POST for user data update
          url: "/update-user",
          body: {
            fname: firstName,
            lname: lastName,
            // email: email,
            mobile: mobile,
            line: address,
            postal_code: zip,
          },
          success: (data) => {
            toast.success(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.log("User data updated successfully:", data);
            setFieldsLocked(true);
          },
        });

        // Ensure the response indicates success (adjust based on your API)
        if (userUpdateResponse.success) {
          setFieldsLocked(true);
        } else {
          console.error("User data update failed:", userUpdateResponse.error);
        }
      } catch (error) {
        console.error("An error occurred during user data update:", error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <DefaultLayout>
      <main className="flex-1">
        <div className="mx-auto">
          <div className="relative h-48 md:h-80 overflow-hidden rounded-lg mb-2">
            <img
              className="w-full h-full object-cover"
              src={coverImage}
              alt="Cover"
            />
            {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
          </div>
          <div className="bg-white p-4 border rounded-lg">
            {loading ? (
              <div className="text-center">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : (
              <div>
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
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {firstName} {lastName}
                    </h3>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* First Namw */}
                  <PrimaryInput
                    labelText={"First Name"}
                    value={firstName}
                    onChange={handleNameChange}
                    placeholder={"Enter your first name"}
                    disabled={fieldsLocked}
                    error={firstNameError}
                  />
                  {/* Last Name */}
                  <PrimaryInput
                    labelText={"Last Name"}
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder={"Enter your last name"}
                    disabled={fieldsLocked}
                    error={lastNameError}
                  />
                  {/* Email */}
                  <PrimaryInput
                    labelText={"Email"}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder={"Enter your email"}
                    disabled={fieldsLocked || emailDisabled}
                    error={emailError}
                  />
                  {/* Mobile */}
                  <PrimaryInput
                    labelText={"Mobile Number"}
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder={"Enter your mobile number"}
                    disabled={fieldsLocked}
                    error={mobileError}
                  />
                  {/* Address */}
                  <PrimaryInput
                    labelText={"Address"}
                    value={address}
                    onChange={handleAddressChange}
                    placeholder={"Enter your address"}
                    disabled={fieldsLocked}
                    error={addressError}
                  />
                  {/* Zip */}
                  <PrimaryInput
                    labelText={"Zip/Postal Code"}
                    value={zip}
                    onChange={handleZipChange}
                    placeholder={"Enter your Zip/Postal Code"}
                    disabled={fieldsLocked}
                    error={zipError}
                  />
                </div>

                <div className="flex justify-between items-center mt-6">
                  {/* Save */}
                  <CustomButton
                    text="SAVE"
                    icon={<IoIosSave />}
                    textColor="text-white"
                    IconclassName="text-2xl mr-1"
                    Fsize="text-lg"
                    className={`hover:bg-black duration-300 font-bold px-8 py-3
                    ${changesMade ? "" : "opacity-50 cursor-not-allowed"}`}
                    onClick={handleUpload}
                  />
                  {/* Update Button */}
                  <CustomButton
                    onClick={handleUnlockFields}
                    text="UNLOCK"
                    IconclassName="text-2xl mr-1"
                    icon={<IoIosUnlock />}
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
        </div>
      </main>
    </DefaultLayout>
  );
};

export default General;
