import React from "react";

const SupplierTable = ({
  suppliers,
  loading,
  setOpen,
  setLoadSupplierDetail,
  setSupplierId,
}) => {
  if (loading) return <p>Loading supplier list...</p>;

  return (
    <div className="bg-white ml-6 mx-auto mt-8 p-8 h-fit shadow-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6 font-heading">Suppliers</h1>

        <button
          className="mb-6 px-2 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-75"
          onClick={() => setOpen(true)}
        >
          Add Supplier
        </button>
      </div>

      {!suppliers || suppliers.length === 0 ? (
        <p className="text-gray-600 mb-4">No suppliers found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-neutral-800 text-white text-left">
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Company Name</th>
                <th className="px-2 py-2">Ph.</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Address, City, State</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-b border-gray-300 hover:cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setLoadSupplierDetail(true);
                    setSupplierId(supplier.id);
                  }}
                >
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
        </div>
      )}
    </div>
  );
};

export default SupplierTable;
