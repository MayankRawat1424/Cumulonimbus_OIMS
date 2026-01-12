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
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Company Name</th>
              <th className="px-2 py-1">Ph.</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Address, City, State</th>
            </tr>
          </thead>
          <tbody className="">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b border-gray-300">
                <td className="px-2 py-1">{supplier.id}</td>
                <td className="px-2 py-1">{supplier.supplierName}</td>
                <td className="px-2 py-1 max-w-32">{supplier.companyName}</td>
                <td className="px-2 py-1">{supplier.phone}</td>
                <td className="px-2 py-1">{supplier.email}</td>
                <td className="px-2 py-1">
                  {supplier.address}, {supplier.city}, {supplier.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SupplierTable;
