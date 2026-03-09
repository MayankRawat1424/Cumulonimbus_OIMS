import React from "react";

const Header = ({ setWindow }) => {
  return (
    <header className="top-0 z-5 ">
      <div className="grid grid-cols-5 items-center h-16 bg-white border-b-2 border-gray-300 px-6">
        <div className="col-span-1 h-full flex items-center">
          <h1 className="font-semibold text-blue-600 text-2xl font-serif">
            Cumulonimbus .
          </h1>
        </div>
        <div className="col-span-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 pl-4">
              {/* Intuitive Retail & logistic solutions for your business */}
            </p>
            <div className="text-sm font-semibold flex items-center gap-16">
              <button
                className="hover:underline hover:cursor-pointer hover:scale-105 transistion-transform duration-75"
                onClick={() => {
                  setWindow(0);
                }}
              >
                Home
              </button>
              <button
                className="hover:underline hover:cursor-pointer hover:scale-105 transistion-transform duration-75"
                onClick={() => {
                  setWindow(1);
                }}
              >
                Logistics
              </button>
              <button
                className="hover:underline hover:cursor-pointer hover:scale-105 transistion-transform duration-75"
                onClick={() => {
                  setWindow(2);
                }}
              >
                Customer
              </button>
              <button
                className="hover:underline hover:cursor-pointer hover:scale-105 transistion-transform duration-75"
                onClick={() => {
                  setWindow(3);
                }}
              >
                Supplier
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
