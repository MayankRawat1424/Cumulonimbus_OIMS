import React, { useEffect, useState } from "react";

const Pma = ({
  setLoadProductDetail,
  loading,
  setProductId,
}) => {

  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profitMargin");
        const data = await res.json();
        setAnalysis(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) return <p>Loading analysis...</p>;

  return (
    <div className="bg-white ml-6 mx-auto mt-8 p-8 h-fit shadow-md">
      <h1 className="font-bold text-3xl mb-6 font-heading">
        Profit Margin Analysis
      </h1>
      {!analysis || analysis.length === 0 ? (
        <p className="text-gray-600 mb-4">No data found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-neutral-800 text-white text-left">
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">Product</th>
                <th className="px-2 py-2">Marked Price</th>
                <th className="px-2 py-2">Cost Price</th>
                <th className="px-2 py-2">Profit / Loss</th>
                <th className="px-2 py-2">Profit %</th>
              </tr>
            </thead>

            <tbody>
              {analysis.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => {
                    setLoadProductDetail(true);
                    setProductId(item.id);
                  }}
                >
                  <td className="px-2 py-1">{item.id}</td>
                  <td className="px-2 py-1">{item.product}</td>
                  <td className="px-2 py-1">{item.markedPrice}</td>
                  <td className="px-2 py-1">{item.costPrice}</td>
                  <td
                    className={`px-2 py-1 font-semibold ${
                      item.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.profit >= 0 ? `+${item.profit}` : item.profit}
                  </td>
                  <td
                    className={`px-2 py-1 ${
                      item.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.profitPercent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Pma;