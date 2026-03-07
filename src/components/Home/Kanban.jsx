import React from "react";

const Kanban = () => {
  return (
    <div className="mt-8">
      {/* <h1>Kanban Board</h1> */}
      <div className="grid grid-cols-4 h-150 gap-4">
        <div className="border-2">
          <h2 className="bg-red-200 p-2 text-center">Backlog</h2>
          <ul className="mx-2 my-2 flex flex-col gap-2">
            <li className="bg-red-50 border-2 border-red-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Reason for backlog</p>
            </li>
            <li className="bg-red-50 border-2 border-red-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product B</p>
                <p>Price - 200</p>
              </div>
              <p>Reason for backlog</p>
            </li>
          </ul>
        </div>
        <div className="border-2">
          <h2 className="bg-purple-200 p-2 text-center">To Order</h2>
          <ul className="mx-2 my-2 flex flex-col gap-2">
            <li className="bg-purple-50 border-2 border-purple-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
            </li>
            <li className="bg-purple-50 border-2 border-purple-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
            </li>
            <li className="bg-purple-50 border-2 border-purple-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
            </li>
            <li className="bg-purple-50 border-2 border-purple-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="border-2">
          <h2 className="bg-blue-200 p-2 text-center">Ordered</h2>
          <ul className="mx-2 my-2 flex flex-col gap-2">
            <li className="bg-blue-50 border-2 border-blue-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Arrival Date: 2026-10-15</p>
            </li>
            <li className="bg-blue-50 border-2 border-blue-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Arrival Date: 2026-10-15</p>
            </li>
            <li className="bg-blue-50 border-2 border-blue-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Arrival Date: 2026-10-15</p>
            </li>
            <li className="bg-blue-50 border-2 border-blue-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Arrival Date: 2026-10-15</p>
            </li>
          </ul>
        </div>
        <div className="border-2">
          <h2 className="bg-green-200 p-2 text-center">Delivered</h2>
          <ul className="mx-2 my-2 flex flex-col gap-2">
            <li className="bg-green-50 border-2 border-green-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Delivery Date: 2026-10-20</p>
            </li>
            <li className="bg-green-50 border-2 border-green-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Delivery Date: 2026-10-20</p>
            </li>
            <li className="bg-green-50 border-2 border-green-400 p-2 rounded">
              <div className="flex justify-between">
                <p>Product A</p>
                <p>Price - 120</p>
              </div>
              <p>Delivery Date: 2026-10-20</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
