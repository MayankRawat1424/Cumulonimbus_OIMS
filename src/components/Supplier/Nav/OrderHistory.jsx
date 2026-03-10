import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/supplierOrders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const statusMap = {
    0: "Pending",
    1: "Ordered",
    2: "Shipped",
    3: "Delivered",
  };

  return (
    <div className="bg-white w-5/6 mx-auto my-8 p-8 shadow-md">
      <h1 className="text-3xl font-bold mb-6 font-heading">
        Supplier Order History
      </h1>

      <table className="w-full border border-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Supplier</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Status</th>
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
              <tr key={order.orderId}>
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.supplierName}</td>
                <td className="border p-2">₹{order.totalAmount}</td>
                <td className="border p-2">
                  {statusMap[order.status] || "Unknown"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
