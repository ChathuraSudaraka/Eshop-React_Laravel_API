import React from "react";

const CustomButton = ({
  text,
  onClick,
  className,
  IconclassName,
  textColor,
  bgColor,
  fSize,
  icon, // new prop for icon
}) => {
  const buttonStyles = {
    color: textColor || "white", // Default text color to white
    backgroundColor: bgColor || "bg-primeColor", // Default background color to primeColor
    fontSize: fSize || "text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-md font-semibold font-titleFont ${buttonStyles.color} ${buttonStyles.backgroundColor} ${buttonStyles.fontSize} ${className}`}
    >
      {icon && <span className={`${IconclassName}`}>{icon}</span>}{" "}
      {/* Render icon if provided */}
      {text}
    </button>
  );
};

export default CustomButton;
