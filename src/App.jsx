import React, { useState } from "react";

import Header from "./components/Header";
import Products from "./components/Logistic/Products";
import Suppliers from "./components/Supplier/Suppliers";
import Customers from "./components/Customer/Customers";
import Home from "./components/Home/Home";

function App() {
  const [window, setWindow] = useState(0);
  return (
    <>
      <Header setWindow={setWindow} />
      {window === 0 ? (
        <Home />
      ) : window === 1 ? (
        <Products />
      ) : window === 3 ? (
        <Suppliers />
      ) : (
        <Customers />
      )}
    </>
  );
}

export default App;
