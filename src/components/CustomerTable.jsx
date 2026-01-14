import React from "react";
// import { useEffect, useState } from "react";

const CustomerTable = ({ customers, loading, setOpen }) => {
  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="bg-white w-5/6 mx-auto mt-8 p-8 border-2 border-gray-300">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6">Customers</h1>
        <button
          className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Customer
        </button>
      </div>

      {customers.length === 0 ? (
        <p className="text-gray-600 mb-4">No customer found</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-300 text-gray-800 text-left">
              <th className="px-2 py-1">id</th>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Phone</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Address</th>
              <th className="px-2 py-1">Gender</th>
            </tr>
          </thead>
          <tbody className="">
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-300">
                <td className="px-2 py-1">{customer.id}</td>
                <td className="px-2 py-1">{customer.customerName}</td>
                <td className="px-2 py-1 max-w-32">{customer.phone}</td>
                <td className="px-2 py-1">{customer.email}</td>
                <td className="px-2 py-1">{customer.address}</td>
                <td className="px-2 py-1">{customer.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerTable;
