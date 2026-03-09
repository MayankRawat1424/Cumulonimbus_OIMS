import React from "react";

const Kanban = () => {
  return (
    <div className="bg-white ml-6 mt-8 p-8 shadow-md">
      <h1 className="font-bold text-3xl mb-6">Stockflow</h1>

      <div className="grid grid-cols-4 gap-6">
        {/* Backlog */}
        <div className="bg-gray-50 border border-gray-200 rounded">
          <h2 className="bg-red-200 text-center py-2 font-semibold">Backlog</h2>

          <ul className="p-3 flex flex-col gap-3">
            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
              <p className="text-sm text-gray-600">Reason for backlog</p>
            </li>

            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product B</p>
                <p>₹200</p>
              </div>
              <p className="text-sm text-gray-600">Reason for backlog</p>
            </li>
          </ul>
        </div>

        {/* To Order */}
        <div className="bg-gray-50 border border-gray-200 rounded">
          <h2 className="bg-amber-200 text-center py-2 font-semibold">
            To Order
          </h2>

          <ul className="p-3 flex flex-col gap-3">
            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
            </li>

            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
            </li>

            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Ordered */}
        <div className="bg-gray-50 border border-gray-200 rounded">
          <h2 className="bg-green-200 text-center py-2 font-semibold">
            Ordered
          </h2>

          <ul className="p-3 flex flex-col gap-3">
            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
              <p className="text-sm text-gray-600">Arrival Date: 2026-10-15</p>
            </li>

            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
              <p className="text-sm text-gray-600">Arrival Date: 2026-10-15</p>
            </li>
          </ul>
        </div>

        {/* Delivered */}
        <div className="bg-gray-50 border border-gray-200 rounded">
          <h2 className="bg-blue-200 text-center py-2 font-semibold">
            Delivered
          </h2>

          <ul className="p-3 flex flex-col gap-3">
            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
              <p className="text-sm text-gray-600">Delivery Date: 2026-10-20</p>
            </li>

            <li className="bg-white border border-gray-300 p-3 rounded shadow-sm hover:bg-gray-50">
              <div className="flex justify-between font-semibold">
                <p>Product A</p>
                <p>₹120</p>
              </div>
              <p className="text-sm text-gray-600">Delivery Date: 2026-10-20</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
