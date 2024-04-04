import React, { useState } from "react";
import { FaDollarSign, FaImages, FaTrash, FaWeight } from "react-icons/fa";
import DefaultLayout from "../../Profile/layouts/DefaultLayout";
import {
  PrimaryDropdown,
  PrimaryInput,
  PrimaryInputIcon,
  PrimaryRatio,
  PrimaryTextArea,
} from "../../Profile/layouts/Inputs";
import CustomButton from "../../Profile/layouts/Button";
import { IoIosSave, IoIosTrash } from "react-icons/io";
import useApiFetch from "../../../hooks/useApiFetch";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Qty, setQty] = useState("");
  const [SKU, setSKU] = useState("");
  const [Weight, setWeight] = useState("");
  const [Width, setWidth] = useState("");
  const [Length, setLength] = useState("");
  const [Breadth, setBreadth] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Define your options array
  const options = ["PUBLIC", "HIDDEN"];

  const handleFile = (e) => {
    setMessage("");
    let selectedFiles = e.target.files;
    let newFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const fileType = selectedFiles[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        if (files.length < 4) {
          const reader = new FileReader();

          reader.onload = (event) => {
            newFiles.push(event.target.result); // Push to a new array
            setFiles([...files, event.target.result]); // Update state with new array
          };
          reader.readAsDataURL(selectedFiles[i]);
        } else {
          setMessage("Maximum 4 images allowed");
        }
      } else {
        setMessage("Only images accepted");
      }
    }
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index); // Filter out the removed image
    setFiles(newFiles); // Update state with the new array
  };

  const handleProductAdd = async () => {
    try {
      const Response = await useApiFetch({
        method: "POST",
        url: "/product-add",
        body: {
          name: productName,
          color: productColor,
          description: productDescription,
          product_img: JSON.stringify(files),
          category: category,
          qty: Qty,
          sku: SKU,
          weight: Weight,
          width: Width,
          length: Length,
          breadth: Breadth,
          price: productPrice,
          discount: productDiscount,
        },
        success: (data) => {
          console.log("Product Add successfully:", data);
          toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      console.error("An error occurred during Product Add:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 xsm:grid-cols-1 md:gap-2">
        {/* Left side */}
        <div className="content uppercase md:col-span-3 sm:col-span-3  xsm:col-span-4">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <PrimaryInput
              labelText="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <PrimaryInput
              labelText="Product Color"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
            />
            <PrimaryTextArea
              labelText="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div className="content mt-2">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4">Category</h2>
              <PrimaryDropdown
                labelText={"Product Category"}
                options={"Select category"}
                value={category}
                onChange={(selectedCategory) => setCategory(selectedCategory)}
                items={["Furniture", "Electronics and gadgets", "Stationery"]}
              />
              <div className="flex gap-4">
                <PrimaryInput
                  labelText="Quantity"
                  type="number"
                  value={Qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <div className="w-full">
                  <PrimaryInput
                    labelText="SKU(Optional)"
                    type="number"
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                  />
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
                value={Weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <PrimaryInput
                    labelText="Length"
                    value={Length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <PrimaryInput
                    labelText="Breadth"
                    value={Breadth}
                    onChange={(e) => setBreadth(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <PrimaryInput
                    labelText="Width"
                    value={Width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="content uppercase md:col-span-1 sm:col-span-4 xsm:col-span-4">
          <div className="bg-white rounded-lg p-4 mb-2 md:mt-0 sm:mt-2">
            <h2 className="text-2xl font-bold mb-4">Publish</h2>
            <div>
              <PrimaryRatio
                value={selectedOption}
                onChange={handleOptionChange}
                labelText="visibility"
                options={options}
                disabled={false}
              />
            </div>
            <hr />
            <div className="flex justify-between gap-4 mt-4">
              <CustomButton
                text="DISCARD"
                IconclassName="text-2xl mr-1"
                icon={<IoIosTrash />}
                textColor="text-red-800"
                bgColor="bg-gray-300"
                Fsize="text-lg"
                className={
                  "hover:bg-blue-700 duration-300 font-bold px-4 py-2 flex"
                }
              />
              <CustomButton
                text="PUBLISH"
                onClick={handleProductAdd}
                IconclassName="text-2xl mr-1"
                icon={<IoIosSave />}
                textColor="text-black"
                bgColor="bg-blue-500"
                Fsize="text-lg"
                className={"hover:bg-blue-700 duration-300 font-bold px-4 py-2"}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 mb-2">
            <h2 className="text-2xl font-bold mb-4">PRODUCT IMAGES</h2>
            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
              {message}
            </span>
            <div className="flex items-center justify-center w-full">
              <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                    src={file}
                    alt={`product-image-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Pricing</h2>
            <div className="flex gap-4 ">
              <div className="w-full">
                <PrimaryInputIcon
                  labelText={"price"}
                  leftIcon={<FaDollarSign />}
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="w-full">
                <PrimaryInputIcon
                  labelText={"DISCOUNT"}
                  leftIcon={<FaDollarSign />}
                  value={productDiscount}
                  onChange={(e) => setProductDiscount(e.target.value)}
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
