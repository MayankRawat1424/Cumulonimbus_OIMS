import React from "react";

const Header = ({ setWindow }) => {
  return (
    <header className="top-0 z-5 ">
      <div className="grid grid-cols-5 items-center h-16 bg-white border-b-2 border-gray-300 px-8">
        <div className="col-span-1 h-full border-r-2 border-gray-300 flex items-center">
          <h1 className="font-semibold text-xl font-serif">Cumulonimbus .</h1>
        </div>
        <div className="col-span-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 pl-4">
              Retail & logistic solutions for your business
            </p>
            <div className="text-sm font-semibold flex items-center gap-16">
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => {
                  setWindow(0);
                }}
              >
                Product
              </button>
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => {
                  setWindow(1);
                }}
              >
                Supplier
              </button>
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => {
                  setWindow(2);
                }}
              >
                Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
