import React, { forwardRef } from "react";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Input component
const PrimaryInput = ({
  value,
  onChange,
  labelText,
  placeholder,
  disabled,
  error,
  id,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-md font-medium text-gray-700">
      {labelText}
    </label>
    <div className="relative">
      <input
        id={id}
        className={`mt-1 block w-full py-1 px-1.5 text-lg rounded-md border-gray-300 shadow-sm border focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 ${
          error ? "border-red-500" : "border-gray-300 outline-none"
        }`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// PrimaryInputIcon components
const PrimaryInputIcon = forwardRef(
  (
    {
      value,
      onChange,
      labelText,
      placeholder,
      disabled,
      error,
      id,
      leftIcon,
      rightIcon,
    },
    ref
  ) => (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block text-md font-medium text-gray-700">
        {labelText}
      </label>
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref} // Attach the ref to the input field
          id={id}
          className={`mt-1 pl-8 pr-8 block w-full py-1 px-1.5 text-lg rounded-md border-gray-300 shadow-sm border focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 ${
            error ? "border-red-500" : "border-gray-300 outline-none"
          }`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {rightIcon && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);

// Textarea component
const PrimaryTextArea = ({
  value,
  onChange,
  labelText,
  placeholder,
  disabled,
  error,
  id,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-md font-medium text-gray-700">
      {labelText}
    </label>
    <textarea
      id={id}
      className={`mt-1 block w-full py-1 px-1.5 text-lg rounded-md border-gray-300 shadow-sm border focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 ${
        error ? "border-red-500" : "border-gray-300 outline-none"
      }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Dropdown component
const PrimaryDropdown = ({
  value,
  onChange,
  labelText,
  options,
  items,
  disabled,
  error,
  id,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!items.includes(selectedValue)) {
      setSelectedValue(null);
    }
  }, [items, selectedValue]);

  const handleItemClick = (newValue, event) => {
    event.preventDefault();
    setSelectedValue(newValue);
    onChange(newValue);
    setIsMenuOpen(false);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-md font-medium text-gray-700 mb-1"
      >
        {labelText}
      </label>
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-[7px] text-md uppercase text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {selectedValue || options}{" "}
            {/* Display selected value or default text */}
            <IoIosArrowDown
              className="-mr-1 h-6 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          show={isMenuOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            static
          >
            {isMenuOpen && (
              <div className="py-1">
                {items.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={(e) => handleItemClick(item, e)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {item}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Ratio component
const PrimaryRatio = ({
  value,
  onChange,
  labelText,
  options = [],
  disabled,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-700 mb-1">
        {labelText}
      </label>
      <div className="flex items-center gap-4">
        {options &&
          options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                type="radio"
                id={option}
                name={labelText}
                value={option}
                checked={value === option}
                onChange={onChange}
                disabled={disabled}
              />
              <label
                htmlFor={option}
                className="text-md font-medium text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export {
  PrimaryInput,
  PrimaryInputIcon,
  PrimaryTextArea,
  PrimaryDropdown,
  PrimaryRatio,
};
