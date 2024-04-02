import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import AddPaymentMethodModal from "./Modal/AddPaymentMethod";
import EditPaymentMethodModal from "./Modal/EditPaymentModal";
import DeletePaymentMethodModal from "./Modal/DeletePaymentMethod"; // Import the DeletePaymentMethodModal
import CustomButton from "../layouts/Button";
import useApiFetch from "../../../hooks/useApiFetch";
import PaymentIcon from "react-payment-icons";

const PaymentMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState({});

  const handleEditPaymentMethod = (card_number, card_type, id) => {
    setIsEditModalOpen(true);
    setPaymentMethodId(id);
    setPaymentMethod({ card_number, card_type, id });
  };

  const handleAddPaymentMethod = () => {
    setIsModalOpen(true);
  };

  const handleDeletePaymentMethod = (paymentId) => {
    setIsDeleteModalOpen(true);
    setPaymentMethodId(paymentId);
  };

  const reloadPaymentMethods = async () => {
    setLoading(true);
    try {
      // Fetch the payment methods
      const response = await useApiFetch({
        method: "GET",
        url: "/user",
        success: (data) => {
          console.log("User data:", data);
          if (data && data.user) {
            setPaymentMethods(data.user.payment);
            // Save user data to localStorage
            localStorage.setItem("userData", JSON.stringify(data.user));
          } else {
            console.error("Invalid response format:", data);
            setError("Failed to fetch payment methods. Please try again.");
          }
        },
      });
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
      setError("Failed to fetch payment methods. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the payment methods when the component mounts
  useEffect(() => {
    reloadPaymentMethods();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:order-2">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
          <div className="bg-white p-4 border border-gray-400 shadow">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : paymentMethods?.length > 0 ? (
              paymentMethods.map((paymentMethod) => (
                <div
                  key={paymentMethod.id}
                  className="bg-white p-5 border border-gray-400 shadow mb-4"
                >
                  <div className="mx-4">
                    <div className="flex justify-between">
                      <div className="flex">
                        <PaymentIcon
                          id={paymentMethod.card_type}
                          style={{ margin: 10, width: 60 }}
                          className="payment-icon"
                        />
                        <p className="text-lg pt-4">
                          {paymentMethod.card_number}
                        </p>
                      </div>
                      <div className="flex gap-9 pt-4">
                        <FaRegEdit
                          className="text-2xl cursor-pointer"
                          onClick={() =>
                            handleEditPaymentMethod(
                              
                              paymentMethod.card_number,
                              paymentMethod.card_type,
                              paymentMethod.id
                            )
                          }
                        />
                        <MdDeleteForever
                          className="text-2xl cursor-pointer"
                          onClick={() =>
                            handleDeletePaymentMethod(paymentMethod.id)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No payment methods available.</p>
            )}

            <div className="flex mt-4">
              <CustomButton
                onClick={handleAddPaymentMethod} // Pass the function to handle the click event
                Text={"Add Payment Method"}
                textColor="text-black"
                bgColor="bg-blue-500"
                Fsize="text-lg"
                className="hover:bg-blue-700 duration-300 font-bold px-8 py-3"
              />
            </div>
          </div>
        </div>
      </main>
      {/* Render the modals */}
      <AddPaymentMethodModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        reloadPaymentMethods={reloadPaymentMethods}
      />
      <EditPaymentMethodModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        reloadPaymentMethods={reloadPaymentMethods}
        paymentMethodId={paymentMethodId}
        paymentMethod={paymentMethod}
      />
      <DeletePaymentMethodModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        reloadPaymentMethods={reloadPaymentMethods}
        paymentMethodId={paymentMethodId}
      />
    </div>
  );
};

export default PaymentMethod;
