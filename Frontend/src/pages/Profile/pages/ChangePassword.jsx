import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import useApiFetch from "../../../hooks/useApiFetch";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const ChangePassword = () => {
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
          },
        });
      } catch (error) {
        console.error("Error in change password API call:", error);
        // Handle the error, you might want to set an error state or show a notification
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <div className="bg-white p-4 border  border-gray-400 shadow">
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="text-base font-semibold"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="text-base font-semibold">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="text-base font-semibold"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold"
            >
              Change Password
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
