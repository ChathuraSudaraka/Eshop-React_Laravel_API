import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../layouts/sidebar/Sidebar";
import ProductRemoveModal from "../layouts/modal/ProductRemoveModal";
import { paginationItems } from "@/constants/productBlock";

const DeleteProduct = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2 overflow-y-auto">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">Remove Product</h2>
          <div className="relative w-full lg:w-[600px] h-[50px]">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <div className="absolute right-3 top-5 transform -translate-y-1/2">
              <FaSearch className="w-5 h-5 text-primeColor" />
            </div>
          </div>

          <div className="bg-gray-200 border border-gray-500 h-[580px] mt-4">
            {searchQuery && (
              <div
                className={`h-[580px] mx-auto top-16 w-full overflow-y-scroll scrollbar-hide cursor-pointer rounded-md p-4`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      key={item._id}
                      className="w-full h-28 bg-white mb-3 flex items-center gap-4 rounded-md p-3 cursor-pointer hover:shadow-md transition duration-300"
                    >
                      <img
                        className="w-24 h-24 object-cover rounded-md"
                        src={item.img}
                        alt="productImg"
                      />
                      <div className="flex flex-col flex-1">
                        <p className="font-semibold text-lg">
                          {item.productName}
                        </p>
                        <p className="text-xs">{item.des}</p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            LKR {item.price}
                          </span>
                        </p>
                      </div>
                      <div className="">
                        <button
                          onClick={openModal}
                          className="bg-red-600 text-white text-lg font-bodyFont w-[185px] h-[50px] mr-4 hover:bg-red-700 duration-300 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {isModalOpen && <ProductRemoveModal closeModal={closeModal} />}
    </div>
  );
};

export default DeleteProduct;
