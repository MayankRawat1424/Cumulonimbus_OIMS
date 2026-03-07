import React from "react";
import { useState, useEffect } from "react";
import PieChart from "../../charts/PieChart";

const InventoryValuation = () => {
  const [totalVal, setTotalVal] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/test");

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();

        const total = data.reduce((sum, item) => sum + item.totalValue, 0);

        setTotalVal(total);

        setChartData({
          labels: data.map((item) => item.category),
          values: data.map((item) => item.totalValue),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
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
          {chartData && <PieChart chartData={chartData} />}
        </div>
      </div>

      <p>Total value : {totalVal}</p>
    </div>
  );
};

export default InventoryValuation;
