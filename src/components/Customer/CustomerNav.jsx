import React from "react";

const CustomerNav = ({ setNav }) => {
  return (
    <>
      <div className="bg-white flex flex-col items-start font-semibold text-lg gap-4 border-r-2 border-gray-300 pt-4 h-screen">
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Customer List");
          }}
        >
          Customer List
        </button>

        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Create Order");
          }}
        >
          Create Order
        </button>

        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Order History");
          }}
        >
          Order History
        </button>
      </div>
    </>
  );
};

export default CustomerNav;
