import React from "react";

const ProductNav = () => {
  return (
    <>
      <div className="bg-white flex flex-col items-start font-semibold text-lg gap-4 border-r-2 border-gray-300 pt-4 h-screen">
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Inventory
        </button>
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Stock Valuation
        </button>
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Profit & Margin Analysis
        </button>
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Out of Stock Items
        </button>
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Sales Trends
        </button>
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Demand Forecasting
        </button>
        <button className="w-full text-left py-2 hover:cursor-pointer hover:underline">
          Seasonal Trends
        </button>
      </div>
    </>
  );
};

export default ProductNav;
