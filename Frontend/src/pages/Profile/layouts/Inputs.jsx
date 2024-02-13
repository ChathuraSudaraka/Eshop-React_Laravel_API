// File: FirstNameInput.js
import React from "react";

const CustomInput = ({
  value,
  onChange,
  labelText,
  placeholder,
  disabled,
  error,
  id,
}) => (
  <div className="mb-4">
    <label className="text-base font-titleFont font-semibold px-2">
      {labelText}
    </label>
    <input
      id={id}
      className={`w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor ${
        error && "border-red-500"
      }`}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default CustomInput;
