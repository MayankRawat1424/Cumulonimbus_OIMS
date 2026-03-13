import React, { useEffect, useState } from "react";

const OrderReceipt = ({ setShowRecipt, recipt }) => {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!recipt) return;

    fetch(`http://localhost:5000/api/supplierOrders/${recipt}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Failed to fetch order", err));

    fetch(`http://localhost:5000/api/supplierOrders/${recipt}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((err) => console.error("Failed to fetch items", err));
  }, [recipt]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black/50">
      <div className="w-1/2 py-6 px-8 h-fit mx-auto shadow-lg bg-white fixed inset-8 overflow-y-scroll border-2 border-gray-500">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl mb-6 font-heading">
            Order Receipt
          </h1>

          <button
            className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
            onClick={() => setShowRecipt(false)}
          >
            Close
          </button>
        </div>

        {/* Order Info */}
        <div className="flex flex-col mb-6 gap-1">
          <p>
            <span className="font-semibold">Order ID:</span> {order.orderId}
          </p>
          <p>
            <span className="font-semibold">Supplier:</span>{" "}
            {order.supplierName}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {order.status === 0
              ? "Backlog"
              : order.status === 1
                ? "To Order"
                : order.status === 2
                  ? "Orderd"
                  : "Delivered"}
          </p>
        </div>

        <table className="w-full mb-6 border-collapse">
          <thead>
            <tr className="border-b-2 border-neutral-900 text-left">
              <th className="py-2">Product</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Price/Item</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2">{item.productName}</td>

                <td className="py-2 text-center">{item.quantity}</td>

                <td className="py-2 text-right">₹{item.pricePerItem}</td>

                <td className="py-2 text-right">
                  ₹{item.quantity * item.pricePerItem}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-between border-t-2 border-neutral-900 pt-4 mt-6 text-lg font-bold">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
