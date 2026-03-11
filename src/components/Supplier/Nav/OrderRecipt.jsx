import React from "react";

const OrderRecipt = ({ setShowRecipt, recipt }) => {
  return (
    <>
      <div className="w-full flex items-center justify-center fixed inset-0  z-10 bg-black/50">
        <div className="bg-white p-6 shadow-md w-1/2">
          <button onClick={() => setShowRecipt(false)}>Close</button>
          <h2 className="text-2xl font-bold mb-4">Order Receipt</h2>
          <p>Order ID: {recipt}</p>
        </div>
      </div>
    </>
  );
};

export default OrderRecipt;
