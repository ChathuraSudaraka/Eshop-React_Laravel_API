import React from "react";

const CustomButton = ({ Text, onClick, className, textColor, bgColor, Fsize }) => {
  const buttonStyles = {
    color: textColor || "white",
    backgroundColor: bgColor || "bg-primeColor",
    fontSize: Fsize || "text-base",
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-md font-semibold font-titleFont ${buttonStyles.color} ${buttonStyles.backgroundColor} ${buttonStyles.fontSize} ${className}`}
    >
      {Text}
    </button>
  );
};

export default CustomButton;
