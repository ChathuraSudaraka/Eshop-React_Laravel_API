import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Sidebar from "../layouts/sidebar/Sidebar";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0"); // Initialize with "0"
  const [category, setCategory] = useState("");
  const [productColor, setProductColor] = useState(""); // Initial color
  const [productImage, setProductImage] = useState(null);

  const [errors, setErrors] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    productColor: "",
    productImage: "",
  });

  const handleAddProduct = () => {
    // Validate input fields
    const newErrors = {
      productName: productName.trim() ? "" : "Product name is required",
      description: description.trim() ? "" : "Description is required",
      price: price.trim()
        ? !isNaN(price) && parseFloat(price) >= 0
          ? ""
          : "Price must be a non-negative number"
        : "Price is required",
      category: category.trim() ? "" : "Category is required",
      productColor: productColor.trim() ? "" : "Product color is required",
      productImage: productImage ? "" : "Product image is required",
    };

    // Check if there are any validation errors
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    // Handle the logic to add the product with the entered details
    // This could involve sending a request to a server or updating local state
    console.log("Adding product with details:", {
      productName,
      description,
      price,
      category,
      productColor,
      productImage,
    });

    // Clear errors
    setErrors({
      productName: "",
      description: "",
      price: "",
      category: "",
      productColor: "",
      productImage: "",
    });

    // Optionally, you can reset the form fields here
    setProductName("");
    setDescription("");
    setPrice(""); // Reset to default value
    setCategory("");
    setProductColor("");
    setProductImage(null);
  };

  const handlePriceChange = (e) => {
    // Ensure that the entered price is a non-negative number
    const inputValue = e.target.value;

    // Remove leading zeros
    const cleanedValue = inputValue.replace(/^0+/, "");

    if (!isNaN(cleanedValue) && parseFloat(cleanedValue) >= 0) {
      setPrice(cleanedValue);
    }
  };

  const handleImageDrop = (acceptedFiles) => {
    // Assuming you only want to handle a single file
    const imageFile = acceptedFiles[0];
    setProductImage(imageFile);
  };

  const colorOptions = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    // Add more color options as needed
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2 overflow-y-auto">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          <div className="bg-white p-4 border border-gray-400 shadow">
            <div className="mb-4">
              <label htmlFor="productName" className="text-base font-semibold">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className={`w-full py-2 px-3 border-b-2 text-base font-medium placeholder-gray-400 outline-none focus:border-blue-500 ${
                  errors.productName ? "border-red-500" : ""
                }`}
                placeholder="Enter the product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-base font-semibold">
                Description
              </label>
              <textarea
                id="description"
                className={`w-full py-2 px-3 border-b-2 text-base font-medium placeholder-gray-400 outline-none focus:border-blue-500 ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Enter the product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="text-base font-semibold">
                Price
              </label>
              <input
                type="text" // Change input type to text
                id="price"
                className={`w-full py-2 px-3 border-b-2 text-base font-medium placeholder-gray-400 outline-none focus:border-blue-500 ${
                  errors.price ? "border-red-500" : ""
                }`}
                placeholder="0"
                value={price}
                onChange={handlePriceChange} // Change to handlePriceChange
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-base font-semibold">
                Category
              </label>
              <select
                type="text"
                id="category"
                className={`w-full py-2 px-3 border-b-2 text-base font-medium placeholder-gray-400 outline-none focus:border-blue-500 ${
                  errors.category ? "border-red-500" : ""
                }`}
                placeholder="Enter the product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="productColor" className="text-base font-semibold">
                Product Color
              </label>
              <select
                id="productColor"
                className={`w-full py-2 px-3 border-b-2 text-base font-medium placeholder-gray-400 outline-none focus:border-blue-500 ${
                  errors.productColor ? "border-red-500" : ""
                }`}
                value={productColor}
                onChange={(e) => setProductColor(e.target.value)}
              >
                <option value="" disabled>
                  Select product color
                </option>
                {colorOptions.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              {errors.productColor && (
                <p className="text-red-500 text-sm">{errors.productColor}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="productImage" className="text-base font-semibold">
                Product Image
              </label>
              <Dropzone onDrop={handleImageDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={`border-dashed border-2 p-4 ${
                      errors.productImage ? "border-red-500" : ""
                    }`}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop an image file here, or click to select one
                    </p>
                  </div>
                )}
              </Dropzone>
              {errors.productImage && (
                <p className="text-red-500 text-sm">{errors.productImage}</p>
              )}
              {productImage && (
                <div className="mt-2">
                  <p>Selected Image: {productImage.name}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] mr-4 hover:bg-black duration-300 font-bold"
            >
              Add Product
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
