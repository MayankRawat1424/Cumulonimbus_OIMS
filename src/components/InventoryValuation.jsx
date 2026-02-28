import React from "react";
import { useState, useEffect } from "react";
import PieChart from "./charts/PieChart";

const InventoryValuation = () => {
  const [stock, setStock] = useState([]);
  const [totalVal, setTotalVal] = useState(0);
  const [chartData, setChartData] = useState(null);
  const aggregateCategoryData = (products) => {
    const categoryMap = {};

    products.forEach((product) => {
      const category =
        product.category && product.category.trim() !== ""
          ? product.category
          : "Uncategorized";

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += product.value; // or stock / price / quantity
    });

    return {
      labels: Object.keys(categoryMap),
      values: Object.values(categoryMap),
    };
  };

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
        const agg = aggregateCategoryData(each);
        setChartData(agg);
      } catch (err) {
        console.error(err);
      }
    };
    stockvalue();
  }, []);

  return (
    <div>
      {/* <p>Work here</p> */}
      {/* {stock.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Category: {item.category}</p>
          <p>Value: {item.value}</p>
        </div>
      ))} */}
      <div className="w-full">
        <div className="flex items-center justify-center w-2/5 mx-auto">
          {stock.length > 0 && <PieChart chartData={chartData} />}
        </div>
      </div>

      <p>Total value : {totalVal}</p>
    </div>
  );
};

export default InventoryValuation;
