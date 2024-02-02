import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Dropzone from "react-dropzone"; // Import Dropzone

const ProductUpdate = ({ closeModal }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productImage, setProductImage] = useState("");
  const [errors, setErrors] = useState({});

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

  const handleImageDrop = (acceptedFiles, rejectedFiles) => {
    // Handle accepted files (validations)
    if (rejectedFiles.length > 0) {
      setErrors({ productImage: "Invalid file type or size" });
    } else {
      // Reset errors if there are no rejected files
      setErrors({});
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file.type.startsWith("image/")) {
        setErrors({ productImage: "Please upload an image file" });
      } else if (file.size > 5242880) {
        // 5 MB in bytes
        setErrors({ productImage: "Image size should be less than 5 MB" });
      } else {
        setProductImage(file);
      }
    }
  };

  const handleUpdate = () => {
    // Add logic to dispatch an action for updating the product
    // ...

    // Close the modal
    closeModal();
  };

  return (
    <div>
      <Transition.Root show={true} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative border border-gray-200 dark:border-border-color dark:bg-blog-component-bg bg-white rounded-lg w-full max-w-md p-4">
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900"
                  >
                    Update Product
                  </Dialog.Title>
                </div>
                <div className="mt-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="productName"
                      className="text-sm font-titleFont text-gray-600"
                    >
                      Product Name
                    </label>
                    <input
                      id="productName"
                      onChange={handleProductNameChange}
                      value={productName}
                      className="w-full h-10 px-3 placeholder-text-sm placeholder-tracking-wide text-base font-medium placeholder-font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label
                      htmlFor="productDescription"
                      className="text-sm font-titleFont text-gray-600"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="productDescription"
                      onChange={handleProductDescriptionChange}
                      value={productDescription}
                      className="w-full h-20 px-3 placeholder-text-sm placeholder-tracking-wide text-base font-medium placeholder-font-normal rounded-md border-[1px] border-gray-400 resize-none outline-none"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label
                      htmlFor="productPrice"
                      className="text-sm font-titleFont text-gray-600"
                    >
                      Product Price
                    </label>
                    <input
                      id="productPrice"
                      onChange={handleProductPriceChange}
                      value={productPrice}
                      className="w-full h-10 px-3 placeholder-text-sm placeholder-tracking-wide text-base font-medium placeholder-font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Enter product price"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label
                      htmlFor="productColor"
                      className="text-sm font-titleFont text-gray-600"
                    >
                      Product Color
                    </label>
                    <input
                      id="productColor"
                      onChange={handleProductColorChange}
                      value={productColor}
                      className="w-full h-10 px-3 placeholder-text-sm placeholder-tracking-wide text-base font-medium placeholder-font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Enter product color"
                    />
                  </div>

                  <div className="mb-4 mt-3">
                    <label
                      htmlFor="productImage"
                      className="text-base font-semibold"
                    >
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
                            Drag 'n' drop an image file here, or click to select
                            one
                          </p>
                        </div>
                      )}
                    </Dropzone>
                    {errors.productImage && (
                      <p className="text-red-500 text-sm">
                        {errors.productImage}
                      </p>
                    )}
                    {productImage && (
                      <div className="mt-2">
                        <p>Selected Image: {productImage.name}</p>
                      </div>
                    )}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProductUpdate;
