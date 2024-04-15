import React, { useEffect, useState } from "react";
import useApiFetch from "../../../hooks/useApiFetch";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { PrimaryInput } from "../layouts/Inputs";
import CustomButton from "../layouts/Button";
import { IoIosSave } from "react-icons/io";
import { toast } from "react-toastify";
import { BsLayoutTextWindowReverse } from "react-icons/bs";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Navigate to the home page if the user is not logged in
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigateTo("/signin");
    }
  }, [navigateTo]);

  const handleChangePassword = async () => {
    // Input validation
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match");
      return;
    } else {
      try {
        const response = await useApiFetch({
          method: "POST",
          notify: true,
          url: "/change-password",
          body: {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
          success: (data) => {
            console.log("Success:", data);
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
          },
        });
      } catch (error) {
        console.error("Error in change password API call:", error);
        // Handle the error, you might want to set an error state or show a notification
      }
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <div className="bg-white p-4 border  border-gray-400 shadow">
        <div className="mb-4">
          <PrimaryInput
            labelText="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <PrimaryInput
            labelText="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <PrimaryInput
            labelText="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div>
            <CustomButton
              text="CHANGE PASSWORD"
              icon={<IoIosSave />}
              textColor="text-white"
              IconclassName="text-2xl mr-1"
              Fsize="text-lg"
              className="hover:bg-black duration-300 font-bold px-8 py-3"
              onClick={handleChangePassword}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="justify-end">
            <BsLayoutTextWindowReverse className="text-black text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
