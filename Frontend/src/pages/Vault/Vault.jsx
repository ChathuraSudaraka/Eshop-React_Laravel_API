import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Vault = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  // const loading = setLoading();
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="VAULT" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Eshop</span>{" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          reiciendis delectus vitae, aliquid sit iure dolorum commodi eum
          numquam voluptate!
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
      <div className="flex xl:px-52 md:52 pb-10">
        <div className="bg-black p-14">
          <img className="w-32 h-32" alt="productImage" />{" "}
        </div>
        <div className="bg-gray-600 p-14 w-full"></div>
      </div>
    </div>
  );
};

export default Vault;
