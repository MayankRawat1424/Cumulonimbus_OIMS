import React from "react";

const CustomerTable = ({ customers, loading, setOpen }) => {
  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="bg-white ml-6 mx-auto mt-8 p-8 h-fit shadow-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6">Customers</h1>

        <button
          className="mb-6 px-2 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-75"
          onClick={() => setOpen(true)}
        >
          Add Customer
        </button>
      </div>

      {!customers || customers.length === 0 ? (
        <p className="text-gray-600 mb-4">No customer found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-neutral-800 text-white text-left">
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Phone</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Address</th>
                <th className="px-2 py-2">Gender</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-2 py-1">{customer.id}</td>
                  <td className="px-2 py-1">{customer.customerName}</td>
                  <td className="px-2 py-1">{customer.phone}</td>
                  <td className="px-2 py-1">{customer.email}</td>
                  <td className="px-2 py-1">{customer.address}</td>
                  <td className="px-2 py-1">{customer.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
