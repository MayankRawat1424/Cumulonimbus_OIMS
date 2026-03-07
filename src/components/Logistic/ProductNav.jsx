import React from "react";

const ProductNav = ({ setNav }) => {
  return (
    <>
      <div className="bg-white flex flex-col items-start font-semibold text-lg gap-4 border-r-2 border-gray-300 pt-4 h-screen">
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Inventory");
          }}
        >
          Inventory
        </button>
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Stock Valuation");
          }}
        >
          Stock Valuation
        </button>
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Profit & Margin Analysis");
          }}
        >
          Profit & Margin Analysis
        </button>
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Out of Stock Items");
          }}
        >
          Out of Stock Items
        </button>
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Sales Trends");
          }}
        >
          Sales Trends
        </button>
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Demand Forecasting");
          }}
        >
          Demand Forecasting
        </button>
        <button
          className="w-full text-left py-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            setNav("Seasonal Trends");
          }}
        >
          Seasonal Trends
        </button>
      </div>
    </>
  );
};

export default ProductNav;
