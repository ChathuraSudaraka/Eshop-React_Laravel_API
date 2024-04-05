import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import useApiFetch from "../../../hooks/useApiFetch";

const Pagination = ({ itemsPerPage }) => {
  const [itemsFromDb, setItemsFromDb] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  useEffect(() => {
    fetchDataFromDb();
  }, []);

  const fetchDataFromDb = async () => {
    try {
      const response = await useApiFetch({
        method: "GET",
        url: "/product-load",
        success: (data) => {
          console.log("Data fetched successfully:", data);
          setItemsFromDb(
            data.products.map((product) => ({ ...product, displayBadge: true }))
          );
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = itemsFromDb.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(itemsFromDb.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setItemsFromDb(
        itemsFromDb.map((product) => ({ ...product, displayBadge: false }))
      );
    }, 120000);
    return () => clearTimeout(timer);
  }, [itemsFromDb]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              product_img={item.product_img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              description={item.description}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {endOffset} of {itemsFromDb.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
