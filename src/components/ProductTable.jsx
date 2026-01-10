import React from "react";
import { useEffect, useState } from "react";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="w-4xl py-4 px-6 mx-auto mt-16 shadow-lg bg-white rounded-md">
      <h1 className="font-bold text-3xl mb-6">Products</h1>
      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-300 text-gray-800 text-left">
              <th className="px-2 py-1">Product</th>
              <th className="px-2 py-1 max-w-20">Description</th>
              <th className="px-2 py-1">Price</th>
              <th className="px-2 py-1">Quantity</th>
              <th className="px-2 py-1 w-8">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-300">
                <td className="px-2 py-1">{product.productName}</td>
                <td className="px-2 py-1 max-w-32">
                  {product.productDescription}
                </td>
                <td className="px-2 py-1">{product.price}</td>
                <td className="px-2 py-1">{product.quantity}</td>
                <td className="px-2 py-1">
                  <div className="flex flex-row gap-2">
                    <button className="bg-blue-500 text-white py-1 w-20 hover:bg-blue-600 hover:cursor-pointer">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 w-20
                      hover:bg-red-600 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
