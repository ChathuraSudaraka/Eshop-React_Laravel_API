import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/eshopSlice";

const WishCart = ({ item }) => {
  const dispatch = useDispatch();

  const firstImage = item.image ? item.image[0] : null;

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(removeFromWishlist(item._id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={firstImage} alt="productImage" />{" "}
        {/* Load product image here */}
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          LKR{item.price}
        </div>
      </div>
    </div>
  );
};

export default WishCart;
