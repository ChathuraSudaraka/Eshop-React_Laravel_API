import React from "react";
import Modal from "react-modal";
import useApiFetch from "../../../../hooks/useApiFetch";

Modal.setAppElement("#root"); // Set the root element for accessibility

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const DeletePaymentMethodModal = ({
  isOpen,
  closeModal,
  paymentMethodId,
  reloadPaymentMethods,
}) => {
  const handleDelete = async () => {
    try {
      // Perform the delete operation
      const response = await useApiFetch({
        method: "DELETE",
        url: `/payment-method-delete/${paymentMethodId}`, // Pass the paymentMethodId in the URL
        success: (data) => {
          console.log("Payment deleted successfully:", data);
          // Reload the payment methods
          reloadPaymentMethods();
          closeModal();
        },
      });
    } catch (error) {
      console.error("Failed to delete payment method:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
      <div className="relative border border-gray-200 dark:border-border-color dark:bg-blog-component-bg bg-white rounded-lg w-full max-w-md p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Delete Payment Details
          </h3>
        </div>
        <div className="mt-4">
          <p className="text-md text-red-600 font-bold">
            Are you sure you want to delete this payment method?
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
          >
            Close
          </button>
          <button
            type="button"
            className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePaymentMethodModal;
