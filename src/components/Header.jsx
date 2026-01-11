import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xs mb-16">
      <div className="grid grid-cols-5 items-center">
        <div className="col-span-1 border py-8">Section 1</div>
        <div className="col-span-4 border py-8">Section 2</div>
      </div>
    </header>
  );
};

export default Header;
