import React from "react";
import Modal from "react-modal";
import useApiFetch from "../../../../hooks/useApiFetch";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    background: "#ffffff",
    padding: "20px",
    maxWidth: "95%", // Adjusted width for responsiveness
    maxHeight: "95%", // Adjusted height for responsiveness
    width: "auto", // Set width to auto for responsiveness
    height: "auto", // Set height to auto for responsiveness
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const ProductRemoveModal = ({ closeModal, isOpen, productId }) => {
  
  const deleteProduct = async () => {
    try {
      const response = await useApiFetch({
        method: "DELETE",
        url: `/product-delete/${productId}`,
        success: (data) => {
          console.log("Product deleted successfully:", data);
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
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <div className="uppercase">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
        </div>
        <div className="text-center mb-2">
          <p>Are you sure you want to delete this product?</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={deleteProduct}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductRemoveModal;
