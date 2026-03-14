import React, { useState, useEffect } from "react";
import OrderRecipt from "../Supplier/Nav/OrderRecipt";

const columns = [
  { title: "Backlog", color: "bg-red-200", status: 0 },
  { title: "To Order", color: "bg-amber-200", status: 1 },
  { title: "Ordered", color: "bg-green-200", status: 2 },
  { title: "Delivered", color: "bg-blue-200", status: 3 },
];

const Kanban = () => {
  const [showRecipt, setShowRecipt] = useState(false);
  const [recipt, setRecipt] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/supplierOrders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (orderId, newStatus) => {
    fetch(`http://localhost:5000/api/supplierOrders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      })
      .catch((err) => console.error(err));
  };

  const handleClick = (id) => {
    setRecipt(id);
    setShowRecipt(true);
  };

  return (
    <>
      {showRecipt && (
        <OrderRecipt setShowRecipt={setShowRecipt} recipt={recipt} />
      )}

      <div className="bg-white ml-6 mt-8 p-8 shadow-md">
        <h1 className="font-bold text-3xl mb-6 font-heading">Stockflow</h1>

        <div className="grid grid-cols-4 gap-6">
          {columns.map((col) => (
            <div
              key={col.status}
              className="bg-gray-50 border border-gray-200 rounded"
            >
              <h2 className={`${col.color} text-center py-2 font-semibold`}>
                {col.title}
              </h2>

              <ul className="p-3 flex flex-col gap-3">
                {orders
                  .filter((order) => order.status === col.status)
                  .map((order) => (
                    <li
                      key={order.orderId}
                      onClick={() => handleClick(order.orderId)}
                      className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50"
                    >
                      <div className="flex justify-between font-semibold">
                        <p>{order.supplierName}</p>
                        <p>₹{order.totalAmount}</p>
                      </div>

                      <div className="flex justify-between mt-3">
                        {order.status > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order.orderId, order.status - 1);
                            }}
                            className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 "
                          >
                            Back
                          </button>
                        )}

                        {order.status < 3 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order.orderId, order.status + 1);
                            }}
                            className="text-sm px-2 py-1 bg-green-200 rounded hover:bg-green-300 "
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Kanban;
