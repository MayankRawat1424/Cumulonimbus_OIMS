import React from "react";

const CustomerNav = ({ setNav }) => {
  const navItems = ["Customer List", "Create Order", "Order History"];

  return (
    <div className="bg-white flex flex-col items-start font-semibold text-lg gap-2 pt-6 h-full shadow-md">
      {navItems.map((item) => (
        <button
          key={item}
          className="w-full text-left py-2 px-6 transition-all duration-100 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 border-blue-500 cursor-pointer"
          onClick={() => setNav(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CustomerNav;
