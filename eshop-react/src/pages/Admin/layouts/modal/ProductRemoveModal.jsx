import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ProductRemoveModal = ({ closeModal }) => {
  const handleRemove = () => {
    closeModal();
  };

  return (
    <div>
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative bg-white dark:bg-blog-component-bg dark:border-border-color border border-gray-200 rounded-lg w-full max-w-md p-4">
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900"
                  >
                    Remove Product
                  </Dialog.Title>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-600">
                    Are you sure you want to remove the product?
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="ml-2 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                    onClick={handleRemove}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="ml-2 px-3 py-2 text-sm font-medium text-white bg-primeColor hover:bg-black rounded-md"
                    onClick={closeModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProductRemoveModal;
