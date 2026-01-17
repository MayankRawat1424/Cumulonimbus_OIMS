import React from "react";
import { useState, useEffect } from "react";

const InventoryValuation = () => {
  const [stock, setStock] = useState([]);
  const [totalVal, setTotalVal] = useState(0);

  useEffect(() => {
    const stockvalue = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        const each = data.map((p) => ({
          name: p.productName,
          category: p.subCategory,
          value: p.price * p.stock,
        }));
        setStock(each);

        let total = 0;
        each.forEach((item) => {
          total += item.value;
        });
        setTotalVal(total);
      } catch (err) {
        console.error(err);
      }
    };
    stockvalue();
  }, []);

  return (
    <div>
      <p>Work here</p>
      {stock.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Category: {item.category}</p>
          <p>Value: {item.value}</p>
        </div>
      ))}
      <p>Total value : {totalVal}</p>
    </div>
  );
};

export default InventoryValuation;
