import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";
import useApiFetch from "../../../hooks/useApiFetch";

const BestSellers = () => {
  const [itemsFromDb, setItemsFromDb] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 8; // Define how many items per page

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
          const items = data.products.map((product) => ({
            ...product,
            displayBadge: true,
          }));
          setItemsFromDb(items);
          setCurrentItems(items.slice(0, itemsPerPage)); // Adjust as needed
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full pb-20">
      <Heading heading="Our BestSellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {currentItems.map((item) => (
          <div key={item._id}>
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
    </div>
  );
};

export default BestSellers;
