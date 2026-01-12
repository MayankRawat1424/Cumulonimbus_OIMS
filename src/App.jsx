import React, { useState } from "react";

import Header from "./components/Header";
import Products from "./components/Products";
import Suppliers from "./components/Suppliers";
import Customers from "./components/Customers";

function App() {
  const [window, setWindow] = useState(0);
  return (
    <>
      <Header setWindow={setWindow} />
      {window === 0 ? (
        <Products />
      ) : window === 1 ? (
        <Suppliers />
      ) : (
        <Customers />
      )}
    </>
  );
}

export default App;
