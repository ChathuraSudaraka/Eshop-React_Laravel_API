import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const PaymentMethod = () => {
  const [initialCardNumber, setInitialCardNumber] = useState("");
  const [initialExpirationDate, setInitialExpirationDate] = useState("");
  const [initialCvv, setInitialCvv] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigateTo("/signin");
    }
  }, [navigateTo]);

  useEffect(() => {
    // Store initial values when the component mounts
    setInitialCardNumber(cardNumber);
    setInitialExpirationDate(expirationDate);
    setInitialCvv(cvv);
  }, [cardNumber, expirationDate, cvv]);

  const validateInputs = () => {
    if (!cardNumber.trim() || !expirationDate.trim() || !cvv.trim()) {
      setError("All fields are required");
      return false;
    }

    if (cardNumber.length !== 16) {
      setError("Card number must be 16 digits");
      return false;
    }

    // Adjust the expiration date validation based on your specific criteria
    if (
      expirationDate.length !== 5 ||
      !expirationDate.match(/^\d{2}\/\d{2}$/)
    ) {
      setError("Invalid expiration date format (MM/YY)");
      return false;
    }

    if (cvv.length !== 3) {
      setError("CVV must be 3 digits");
      return false;
    }

    setError("");
    return true;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    setIsEditing(true);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
    setIsEditing(true);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (validateInputs()) {
      // Implement your logic for updating the data
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    if (validateInputs()) {
      // Implement your logic for saving the data
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="bg-white p-4 border border-gray-400 shadow">
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="text-base font-titleFont font-semibold px-2"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your card number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="expirationDate"
                  className="text-base font-titleFont font-semibold px-2"
                >
                  Expiration Date
                </label>
                <input
                  id="expirationDate"
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="text"
                  placeholder="MM/YY"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cvv"
                  className="text-base font-titleFont font-semibold px-2"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="text"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            {isEditing && (
              <button
                onClick={handleUpdate}
                className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] mr-4 hover:bg-black duration-300 font-bold"
              >
                Save
              </button>
            )}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold"
              >
                Update
              </button>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentMethod;
