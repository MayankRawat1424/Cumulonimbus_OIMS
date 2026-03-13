import React, { useEffect, useState } from "react";
import OrderRecipt from "./OrderRecipt";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [recipt, setRecipt] = useState(null);
  const [showRecipt, setShowRecipt] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/supplierOrders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const statusMap = {
    0: "Backlog",
    1: "To Order",
    2: "Ordered",
    3: "Delivered",
  };

  return (
    <>
      {showRecipt && (
        <OrderRecipt setShowRecipt={setShowRecipt} recipt={recipt} />
      )}
      <div className="bg-white w-5/6 mx-auto my-8 p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-6 font-heading">
          Supplier Order History
        </h1>

        <table className="w-full border border-gray-300">
          <thead className="bg-neutral-900 text-left">
            <tr>
              <th className="border border-black p-2 text-white">Order ID</th>
              <th className="border border-black p-2 text-white">Supplier</th>
              <th className="border border-black p-2 text-white">
                Total Amount
              </th>
              <th className="border border-black p-2 text-white">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-50 hover:cursor-pointer border-b border-gray-300"
                  onClick={() => {
                    setRecipt(order.orderId);
                    setShowRecipt(true);
                  }}
                >
                  <td className=" p-2">{order.orderId}</td>
                  <td className="p-2">{order.supplierName}</td>
                  <td className="p-2">₹{order.totalAmount}</td>
                  <td className="p-2">
                    {statusMap[order.status] || "Unknown"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistory;
