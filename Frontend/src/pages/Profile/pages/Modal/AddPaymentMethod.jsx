import React, { useState } from "react";
import Modal from "react-modal";
import PaymentIcon from "react-payment-icons";
import DatePicker from "react-datepicker";
import { isValid, parseISO, format } from "date-fns";
import { toast } from "react-toastify";
import useApiFetch from "../../../../hooks/useApiFetch";
import "react-datepicker/dist/react-datepicker.css";

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

const AddPaymentMethodModal = ({
  isOpen,
  closeModal,
  reloadPaymentMethods,
}) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleUpdate = async () => {
    // Perform validation
    const errors = {};
    if (!cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!isValidCardNumber(cardNumber)) {
      errors.cardNumber = "Invalid card number";
    }
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
    if (!selectedPayment) {
      errors.selectedPayment = "Please select a payment method";
    }

    // If errors, stop submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      try {
        const response = await useApiFetch({
          method: "POST",
          url: "/payment-method",
          body: {
            card_number: cardNumber,
            card_type: selectedPayment,
            expire_date: expirationDate,
            cvv: cvv,
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
            reloadPaymentMethods(); // Reload payment methods after successful addition
            closeModal(); // Close modal after successful submission
          },
        });
        // Handle response if needed
        console.log("Payment method added successfully:", response);
      } catch (error) {
        console.error("Error in adding payment method:", error);
        alert("Failed to add payment method. Please try again.");
      }
    }
  };

  const handlePaymentIconClick = (iconId) => {
    setSelectedPayment(iconId);
    // Example: Set payment method based on icon clicked
    console.log("Payment method selected:", iconId);
  };

  const isValidCardNumber = (cardNumber) => {
    // Visa, Mastercard, American Express, Diners Club, Discover, JCB
    const cardNumberRegex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    return cardNumberRegex.test(cardNumber);
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
          Select Card Type
        </label>
        <div className="flex justify-center">
          <div
            onClick={() => handlePaymentIconClick("visa")}
            className={
              selectedPayment === "visa"
                ? "payment-button-selected"
                : "payment-button"
            }
          >
            <PaymentIcon
              id="visa"
              style={{ margin: 10, width: 60 }}
              className="payment-icon"
            />
          </div>
          <div
            onClick={() => handlePaymentIconClick("mastercard")}
            className={
              selectedPayment === "mastercard"
                ? "payment-button-selected"
                : "payment-button"
            }
          >
            <PaymentIcon
              id="mastercard"
              style={{ margin: 10, width: 60 }}
              className="payment-icon"
            />
          </div>
          <div
            onClick={() => handlePaymentIconClick("amex")}
            className={
              selectedPayment === "amex"
                ? "payment-button-selected"
                : "payment-button"
            }
          >
            <PaymentIcon
              id="amex"
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
            className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
              errors.cardNumber ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Enter your card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
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
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPaymentMethodModal;
