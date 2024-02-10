import React, { useState } from "react";
import Modal from "react-modal";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import useApiFetch from "../../../hooks/useApiFetch";

Modal.setAppElement("#root"); // Set the root element for accessibility

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const ForgotPassModal = ({ isOpen, closeModal, email }) => {
  // const [isModalOpen, setIsModalOpen] = useState(true);

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleUpdate = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid OTP");
    } else {
      try {
        const response = await useApiFetch({
          method: "POST",
          url: "/otp-verify",
          body: {
            otp: otp,
          },
          success: (data) => {
            closeModal();
            navigate(`/changepass?email=${email}&otp=${otp}`);
          },
        });
      } catch (error) {
        console.error("Error in login API call:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
      <div className="relative border border-gray-200 dark:border-border-color dark:bg-blog-component-bg bg-white rounded-lg w-full max-w-md p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Enter OTP</h3>
        </div>
        <div className="mt-9">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle="flex justify-center"
            inputStyle="w-12 h-12 text-3xl mx-2 border-gray-400 border outline-none text-center"
            isInputNum
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
          >
            Close
          </button>
          <button
            type="button"
            className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
            onClick={handleUpdate}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassModal;
