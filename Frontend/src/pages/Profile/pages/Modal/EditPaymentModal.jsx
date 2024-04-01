import React, { useState } from "react";
import Modal from "react-modal";
import PaymentIcon from "react-payment-icons";
import DatePicker from "react-datepicker";
import { isValid, parseISO, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import useApiFetch from "../../../../hooks/useApiFetch";

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

const EditPaymentMethodModal = ({
  isOpen,
  closeModal,
  reloadPaymentMethods,
  paymentMethodId,
  paymentMethod,
}) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const { card_number } = paymentMethod || {};

  const handleUpdate = async () => {
    // Perform validation
    const errors = {};
    if (!expirationDate) {
      errors.expirationDate = "Expiration date is required";
    } else {
      const expirationDateString = format(expirationDate, "yyyy-MM-dd");
      if (!isValidDate(expirationDateString)) {
        errors.expirationDate = "Invalid expiration date";
      }
    }
    if (!cvv.trim()) {
      errors.cvv = "CVV is required";
    }

    // If errors, stop submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      try {
        const response = await useApiFetch({
          method: "PUT",
          url: `/payment-method-edit/${paymentMethodId}`,
          body: {
            expire_date: expirationDate,
            cvv: cvv,
          },
        });

        // You can handle actual response scenarios based on your API
        console.log("Payment method updated successfully:", response);
        reloadPaymentMethods();
        closeModal(); // Close modal after successful submission
      } catch (error) {
        console.error("Error updating payment method:", error);
        alert("Failed to update payment method. Please try again.");
      }
    }
  };

  const isValidDate = (date) => {
    return isValid(parseISO(date));
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
      <div className="relative border border-gray-200 dark:border-border-color dark:bg-blog-component-bg bg-white rounded-lg w-full max-w-md p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Enter Payment Details
          </h3>
        </div>
        <label
          htmlFor="cardNumber"
          className="text-base font-semibold px-2 block mt-2"
        >
          Card Type
        </label>
        <div className="flex justify-center">
          <div>
            <PaymentIcon
              id={paymentMethod.card_type}
              style={{ margin: 10, width: 60 }}
              className="payment-icon"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="text-base font-semibold px-2 block"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            type="text"
            placeholder="Enter your card number"
            value={card_number}
            disabled
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="expirationDate"
              className="text-base font-semibold px-2 block"
            >
              Expiration Date
            </label>
            <DatePicker
              id="expirationDate"
              className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                errors.expirationDate ? "border-red-500" : ""
              }`}
              placeholderText="Select expiration date"
              selected={expirationDate}
              onChange={(date) => setExpirationDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expirationDate}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="text-base font-semibold px-2 block">
              CVV
            </label>
            <input
              id="cvv"
              className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
                errors.cvv ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
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
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPaymentMethodModal;
