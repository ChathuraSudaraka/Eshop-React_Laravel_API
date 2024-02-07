import React, { useState } from "react";
import Modal from "react-modal";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

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

const ForgotPassModal = ({ closeModal }) => {
  const [otp, setOtp] = useState("");

  const handleUpdate = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
    >
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
          <Link
            to="/changepass"
            type="button"
            className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
            onClick={handleUpdate}
          >
            Submit
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassModal;
