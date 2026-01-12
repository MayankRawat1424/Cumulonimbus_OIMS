import React from "react";
// import { useEffect, useState } from "react";

const SupplierTable = ({ suppliers, loading, setOpen }) => {
  if (loading) return <p>Loading supplier list...</p>;

  return (
    <div className="w-4xl py-4 px-8 mx-auto mt-16 shadow-lg bg-white">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6">Suppliers</h1>
        <button
          className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Supplier
        </button>
      </div>

      {suppliers.length === 0 ? (
        <p className="text-gray-600 mb-4">No suppliers found</p>
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
            {suppliers.map((product) => (
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

export default SupplierTable;
