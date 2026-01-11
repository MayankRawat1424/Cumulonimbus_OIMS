import React from "react";
// import { useEffect, useState } from "react";

const ProductTable = ({ products, loading }) => {
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
              <th className="px-2 py-1">id</th>
              <th className="px-2 py-1">Product</th>
              <th className="px-2 py-1">Category</th>
              <th className="px-2 py-1">Price</th>
              <th className="px-2 py-1">Quantity</th>
              <th className="px-2 py-1">In Stock</th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-300">
                <td className="px-2 py-1">{product.id}</td>
                <td className="px-2 py-1">{product.productName}</td>
                <td className="px-2 py-1 max-w-32">{product.subCategory}</td>
                <td className="px-2 py-1">{product.price}</td>
                <td className="px-2 py-1">
                  {product.quantity} {product.unit}
                </td>
                <td className="px-2 py-1">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
