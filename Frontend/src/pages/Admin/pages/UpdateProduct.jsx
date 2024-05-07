import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import ProductUpdate from "../layouts/modal/ProductUpdateModal";
import DefaultLayout from "../layouts/DefaultLayout";
import useApiFetch from "../../../hooks/useApiFetch";
import {
  PrimaryDropdown,
  PrimaryInputIcon,
  PrimaryRatio,
} from "../../Profile/layouts/Inputs";
import { GiStabbedNote } from "react-icons/gi";
import CustomButton from "../../Profile/layouts/Button";
import { AiOutlineUnorderedList } from "react-icons/ai";

const UpdateProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const eshopProducts = useSelector((state) => state.eshopReducer.products);
  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  // Update Product Modal data Pass
  const [selectedProductId, setSelectedProductId] = useState(null);

  const options = ["PUBLIC", "HIDDEN"];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const loadProduct = async () => {
    try {
      const response = await useApiFetch({
        method: "GET",
        url: "/product-load",
        success: (data) => {
          console.log("Data fetched successfully:", data);
          setFilteredProducts(data.products);
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchQuery(searchQuery);
    // perform search using filteredProducts state and set the result to filteredProducts state use name to filter
    const filteredProducts = eshopProducts.filter((product) => {
      return product.productName.toLowerCase().includes(searchQuery);
    });
    setFilteredProducts(filteredProducts);
  };

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelectedProductId(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const DataArray = [
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 1 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 2 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 3 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 4 has been updated",
      date: "2021-09-09",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      text: "Product 5 has been updated",
      date: "2021-09-09",
    },
  ];

  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 xsm:grid-cols-1 md:gap-2">
        <div className="col-span-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 uppercase">
              Update Product
            </h2>
            <div className="flex w-full gap-1 uppercase justify-between">
              <div className="w-[500px]">
                <PrimaryInputIcon
                  labelText="search"
                  rightIcon={<FaSearch />}
                  onChange={handleSearch}
                  value={searchQuery}
                  ref={inputRef} // Attach the ref to the input field
                />
              </div>
              <div>
                <PrimaryDropdown
                  labelText={"Filter by Category"}
                  options={"Select category"}
                  value={category}
                  onChange={(selectedCategory) => setCategory(selectedCategory)}
                  items={[
                    "ALL",
                    "Furniture",
                    "Electronics and gadgets",
                    "Stationery",
                  ]}
                />
              </div>
            </div>

            <div className="bg-gray-200 border rounded-lg border-slate-300 h-[580px] mt-4">
              <div
                className={`h-full mx-auto top-16 w-full overflow-y-scroll scrollbar-hide rounded-md p-2`}
              >
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    className="w-full h-28 bg-white mb-2 flex items-center gap-4 rounded-md p-2 cursor-default hover:shadow-sm transition duration-300"
                  >
                    <img
                      className="w-24 h-24 object-cover rounded-md"
                      src={
                        item.product_img && item.product_img.length > 0
                          ? item.product_img[0]
                          : ""
                      }
                      alt="productImg"
                    />
                    <div className="flex flex-col flex-1">
                      <p className="font-semibold text-lg line-clamp-1">
                        {item.productName ? item.productName : "No Name"}
                      </p>
                      <p className="text-xs line-clamp-1">
                        {item.description || "No Description"}
                      </p>{" "}
                      {/* Add default value */}
                      <p className="text-sm line-clamp-1">
                        Price:{" "}
                        <span className="text-primeColor font-semibold line-clamp-1">
                          LKR {item.price || "N/A"} {/* Add default value */}
                        </span>
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <CustomButton
                        onClick={() => {
                          openModal(item._id);
                        }}
                        text="UPDATE"
                        textColor="text-black"
                        bgColor="bg-blue-500"
                        Fsize="text-lg"
                        className={
                          "hover:bg-blue-700 duration-300 font-bold px-3 py-2"
                        }
                      />
                      <CustomButton
                        text="VIEW"
                        icon={<AiOutlineUnorderedList />}
                        textColor="text-white"
                        IconclassName="text-2xl mr-1"
                        Fsize="text-lg"
                        className={
                          "hover:bg-black duration-300 font-bold px-3 py-2 opacity-50"
                        }
                        onClick={() =>
                          navigate(
                            `/product/${(item.productName || "")
                              .toLowerCase()
                              .split(" ")
                              .join("")}`, // Add default value
                            {
                              state: {
                                item: item,
                              },
                            }
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 sm:col-span-4 xsm:col-span-4 md:mt-0 sm:mt-2">
          <div className="bg-white p-2 rounded-lg shadow uppercase">
            <h2 className="text-2xl font-bold mb-4 mt-2">Product visibility</h2>
            <PrimaryRatio
              value={selectedOption}
              onChange={handleOptionChange}
              labelText="visibility"
              options={options}
              disabled={false}
            />
          </div>
          <div className="bg-white p-2 rounded-lg shadow uppercase mt-2">
            <h2 className="text-2xl font-bold mb-4 mt-2">Recent Updates</h2>
            <div className="rounded-md h-[538px] overflow-y-scroll">
              {DataArray.map((data, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border dark:border-slate-700 rounded-md p-2 mb-1"
                >
                  <div className="flex items-center">
                    <img
                      src={data.imageUrl}
                      alt="img"
                      className="w-12 border rounded-md"
                    />
                    <div className="ml-2">
                      <h1 className="text-sm line-clamp-1">{data.text}</h1>
                      <h1 className="text-xs">{data.date}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/signup">
                      <GiStabbedNote className="text-xl text-gray-800 cursor-pointer" />
                    </Link>
                    <Link to="/signup">
                      <FaTrashAlt className="text-xl text-red-700 cursor-pointer" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedProductId !== null && (
        <ProductUpdate
          closeModal={closeModal}
          isOpen={isModalOpen}
          loadProduct={loadProduct}
          productId={selectedProductId}
        />
      )}
    </DefaultLayout>
  );
};

export default UpdateProduct;
