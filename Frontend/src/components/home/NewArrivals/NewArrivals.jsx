import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import useApiFetch from "../../../hooks/useApiFetch";

const NewArrivals = () => {
  const [itemsFromDb, setItemsFromDb] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

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

  const itemsPerPage = 10; // Define how many items per page

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {currentItems.map((item) => (
          <div key={item._id} className="px-2 w-full">
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
      </Slider>
    </div>
  );
};

export default NewArrivals;
