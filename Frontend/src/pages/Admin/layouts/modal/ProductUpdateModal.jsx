import React, { useState } from "react";
import Modal from "react-modal";
import { PrimaryInput, PrimaryTextArea } from "../../../Profile/layouts/Inputs";
import { FaImages, FaTrash } from "react-icons/fa";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    background: "#ffffff",
    padding: "20px",
    width: "95%", 
    height: "95%",
    maxWidth: "600px",
    maxHeight: "800px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const ProductUpdate = ({ closeModal, isOpen }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColor, setProductColor] = useState("");
  const [files, setFiles] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [message, setMessage] = useState("");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductColorChange = (e) => {
    setProductColor(e.target.value);
  };

  const handleFile = (e) => {
    setMessage("");
    let selectedFiles = e.target.files;
    let newFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const fileType = selectedFiles[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        if (files.length < 4) {
          newFiles.push(selectedFiles[i]);
        } else {
          setMessage("Maximum 4 images allowed");
        }
      } else {
        setMessage("Only images accepted");
      }
    }

    setFiles([...files, ...newFiles]);
  };

  const removeImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleProductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleUpdate = () => {
    // Add logic to dispatch an action for updating the product
    // ...

    // Close the modal
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <div className="uppercase">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        </div>
        <PrimaryInput
          labelText="Product Name"
          placeholder="Enter product name"
          value={productName}
          onChange={handleProductNameChange}
        />
        <PrimaryTextArea
          labelText="Product Description"
          placeholder="Enter product description"
          value={productDescription}
          onChange={handleProductDescriptionChange}
        />
        <PrimaryInput
          labelText="Product Price"
          placeholder="Enter product price"
          value={productPrice}
          onChange={handleProductPriceChange}
        />
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <PrimaryInput
              labelText="Product Color"
              placeholder="Enter product color"
              value={productColor}
              onChange={handleProductColorChange}
            />
          </div>
          <div className="w-full">
            <PrimaryInput
              labelText="Quantity"
              placeholder="Enter product quantity"
              value={productQuantity}
              onChange={handleProductQuantityChange}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <h3 className="text- font-semibold text-gray-600">Product Images</h3>
          <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
            {message}
          </span>
          <div className="flex items-center justify-center w-full">
            <label className="flex cursor-pointer flex-col w-full h-20 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <FaImages className="text-5xl text-gray-500" />
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                onChange={handleFile}
                className="opacity-0"
                multiple="multiple"
                name="product_img[]"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {files.map((file, index) => (
              <div key={index} className="overflow-hidden relative">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-xs"
                >
                  <FaTrash />
                </button>
                <img
                  className="h-20 w-20 rounded-md"
                  src={URL.createObjectURL(file)}
                  alt={`product-image-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          type="button"
          className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ProductUpdate;
