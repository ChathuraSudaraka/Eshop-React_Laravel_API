import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { ImImage } from "react-icons/im";
import { FaDollarSign, FaIcons, FaTrash, FaWeight } from "react-icons/fa";
import DefaultLayout from "../../Profile/layouts/DefaultLayout";
import {
  PrimaryDropdown,
  PrimaryInput,
  PrimaryInputIcon,
  PrimaryTextArea,
} from "../../Profile/layouts/Inputs";
import CustomButton from "../../Profile/layouts/Button";
import { IoIosSave, IoIosTrash } from "react-icons/io";

const AddProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleImageDrop = (acceptedFiles) => {
    if (productImages.length >= 4) {
      // Maximum number of images reached, do not add more
      return;
    }

    const newImage = acceptedFiles[0];
    setProductImages((prevImages) => [...prevImages, newImage]);
    setErrors((prevErrors) => [...prevErrors, ""]);
  };

  const handleDeleteImage = (index) => {
    setProductImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors.splice(index, 1);
      return updatedErrors;
    });
  };

  const handleClick = () => {
    // Handle click logic here
  };

  const handleImageError = (index) => {
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = "Image upload failed";
      return updatedErrors;
    });
  };

  const renderImages = () => {
    return productImages.map((image, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(image)}
          alt={`Product Image ${index + 1}`}
          className="w-full h-auto rounded-lg"
          onError={() => handleImageError(index)}
        />
        <button
          onClick={() => handleDeleteImage(index)}
          className="absolute top-2 right-2 p-1 bg-black text-white rounded-full text-md"
        >
          <FaTrash />
        </button>
        {errors[index] && (
          <p className="absolute bottom-0 left-0 right-0 text-red-500 text-sm mt-1">
            {errors[index]}
          </p>
        )}
      </div>
    ));
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left side */}
        <div className="content uppercase">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <PrimaryInput labelText="Product Name" />
            <PrimaryInput labelText="product color" />
            <PrimaryTextArea labelText="Product Description" />
          </div>
          <div className="content mt-2">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4">Category</h2>
              <PrimaryDropdown
                labelText={"Product Category"}
                options={"Select category"}
                items={["Furniture", "Electronics and gadgets", "Stationery"]}
              />
              <div className="flex gap-4">
                <PrimaryInput labelText="Quantity" type="number" />
                <div className="w-full">
                  <PrimaryInput labelText="SKU(Optional)" type="number" />
                </div>
              </div>
            </div>
          </div>
          <div className="content uppercase mt-2">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4">Shipping and Delivery</h2>
              <PrimaryInputIcon
                labelText={"Item Weight"}
                leftIcon={<FaWeight />}
                rightIcon={"KG"}
              />
              <div className="flex justify-between gap-4">
                <PrimaryInput labelText="Length" />
                <PrimaryInput labelText="Breadth" />
                <PrimaryInput labelText="Width" />
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="content uppercase">
          <div className="bg-white rounded-lg p-4 mb-2">
            <h2 className="text-2xl font-bold mb-4">Publish</h2>
            <div className="flex justify-between gap-4 ">
              <CustomButton
                text="DISCARD"
                IconclassName="text-2xl mr-1"
                icon={<IoIosTrash />}
                textColor="text-red-800"
                bgColor="bg-gray-300"
                Fsize="text-lg"
                className={"hover:bg-blue-700 duration-300 font-bold px-8 py-3"}
              />
              <CustomButton
                text="PUBLISH"
                IconclassName="text-2xl mr-1"
                icon={<IoIosSave />}
                textColor="text-black"
                bgColor="bg-blue-500"
                Fsize="text-lg"
                className={"hover:bg-blue-700 duration-300 font-bold px-8 py-3"}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 mb-2">
            <h2 className="text-2xl font-bold mb-4">PRODUCT IMAGES</h2>
            <div className="flex flex-col">
              <Dropzone onDrop={handleImageDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-dashed rounded-lg border-2 p-4 text-center mb-4"
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <ImImage className="text-2xl" />
                      <span className="text-blue-500 cursor-pointer uppercase text-sm">
                        Click to upload
                        <p className="text-black"> or drag and drop</p>
                      </span>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="grid grid-cols-2 gap-2">{renderImages()}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Pricing</h2>
            <div className="flex gap-4 ">
              <div className="w-full">
                <PrimaryInputIcon
                  labelText={"price"}
                  leftIcon={<FaDollarSign />}
                />
              </div>
              <div className="w-full">
                <PrimaryInputIcon
                  labelText={"TAX"}
                  leftIcon={<FaDollarSign />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddProduct;
