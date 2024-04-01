import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftSide from "./ShopStatus";
import useApiFetch from "../../hooks/useApiFetch";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { set } from "date-fns";

const PaymentSignUp = () => {
  // ============= Initial State Start here =============
  const [Address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [card, setCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null); // Initialize as null
  const [cvv, setCvv] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errPostalCode, setErrPostalCode] = useState("");
  const [errCard, setErrCard] = useState("");
  const [errCardNumber, setErrCardNumber] = useState("");
  const [errExpiryDate, setErrExpiryDate] = useState("");
  const [errCvv, setErrCvv] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
    setErrPostalCode("");
  };

  const handleCard = (e) => {
    setCard(e.target.value);
    setErrCard("");
  };

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value);
    setErrCardNumber("");
  };

  const handleExpiryDate = (date) => {
    // Update to handle Date object
    setExpiryDate(date);
    setErrExpiryDate("");
  };

  const handleCvv = (e) => {
    setCvv(e.target.value);
    setErrCvv("");
  };

  const handlePaymentSignUp = async (e) => {
    e.preventDefault();
    if (checked) {
      if (!Address) {
        setErrAddress("Enter your address");
      }
      if (!city) {
        setErrCity("Select your city");
      }
      if (!country) {
        setErrCountry("Select your country");
      }
      if (!postalCode) {
        setErrPostalCode("Enter your postal/zip code");
      }
      if (!card) {
        setErrCard("Select your Card Type");
      }
      if (!cardNumber) {
        setErrCardNumber("Enter your card number");
      }
      if (!expiryDate) {
        setErrExpiryDate("Enter expiration date");
      }
      if (!cvv) {
        setErrCvv("Enter your cvv");
      }
      // ============== Getting the value ==============
      if (
        Address &&
        city &&
        country &&
        postalCode &&
        card &&
        cardNumber &&
        expiryDate &&
        cvv
      ) {
        await useApiFetch({
          url: "/payment",
          method: "POST",
          body: {
            line: Address,
            city: city,
            country: country,
            postal_code: postalCode,
            card_number: cardNumber,
            card_type: card,
            expire_date: expiryDate.toISOString(), // Convert to ISO string
            cvv: cvv,
          },
          success: (data) => {
            setSuccessMsg(
              `Hello dear Sir, Welcome you to Eshop. We received your Sign up request. We are processing to validate your access.`
            );
            setAddress("");
            setCity("");
            setCountry("");
            setPostalCode("");
            setCard("");
            setCardNumber("");
            setExpiryDate(null); // Reset to null
            setCvv("");
          },
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <LeftSide />
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Back to shopping
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your Payment Method
              </h1>
              <div className="flex flex-col gap-3">
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    onChange={handleAddress}
                    value={Address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 1st street , UK"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>

                {/* City (Dropdown) */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    City
                  </p>
                  <select
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  >
                    {/* Add options for cities */}
                    <option>Select City</option>
                    <option>Colombo</option>
                    <option>Jaffna</option>
                    <option>Kandy</option>
                    <option>Galle</option>
                  </select>
                  {errCity && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCity}
                    </p>
                  )}
                </div>

                {/* Country (Dropdown) */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <select
                    onChange={handleCountry}
                    value={country}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  >
                    {/* Add options for countries */}
                    <option>Select Country</option>
                    <option>Sri Lanka</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                  {errCountry && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCountry}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Zip/Postal code
                  </p>
                  <input
                    onChange={handlePostalCode}
                    value={postalCode}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter your postal code"
                  />
                  {errPostalCode && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPostalCode}
                    </p>
                  )}
                </div>

                <hr />

                {/* Card Type (Dropdown) */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Card Type
                  </p>
                  <select
                    onChange={handleCard}
                    value={card}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  >
                    {/* Add options for cities */}
                    <option>Select City</option>
                    <option>visa</option>
                    <option>mastercard</option>
                    <option>amex</option>
                  </select>
                  {errCard && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCard}
                    </p>
                  )}
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Card Number
                  </p>
                  <input
                    onChange={handleCardNumber}
                    value={cardNumber}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter your Card Number"
                  />
                  {errCardNumber && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry Date */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Expiration Date
                  </p>
                  <ReactDatePicker
                    selected={expiryDate}
                    onChange={handleExpiryDate}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    placeholderText="eg. MM/YYYY"
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
                  {errExpiryDate && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errExpiryDate}
                    </p>
                  )}
                </div>

                {/* CVV */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    CVV
                  </p>
                  <input
                    onChange={handleCvv}
                    value={cvv}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter CVV"
                  />
                  {errCvv && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCvv}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Eshop{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={handlePaymentSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Payment Method
                </button>

                {/* Back to shopping link */}
                <p className="text-sm text-center font-titleFont font-medium">
                  <Link to="/">
                    <span className="hover:text-blue-600 duration-300">
                      Back to shopping
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentSignUp;
