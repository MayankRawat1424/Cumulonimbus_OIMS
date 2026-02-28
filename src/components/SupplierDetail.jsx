import React, { useEffect, useState } from "react";

const SupplierDetail = ({
  setLoadSupplierDetail,
  supplierId,
  fetchSupplier,
}) => {
  const [loading, setLoading] = useState(true);
  const [Supplier, setSupplier] = useState(null);
  const [originalSupplier, setOriginalSupplier] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/suppliers/${supplierId}`,
        );
        const data = await res.json();
        setSupplier(data);
        setOriginalSupplier(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [supplierId]);

  const handleDelete = async (supplierId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/suppliers/${supplierId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        throw new Error("Update failed");
      }
      setSupplier(null);
      alert("Supplier Deleted");
      fetchSupplier();
      setLoadSupplierDetail(false);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleEdit = async () => {
    if (JSON.stringify(Supplier) === JSON.stringify(originalSupplier)) {
      alert("No edits to save!");
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/suppliers/${supplierId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Supplier),
        },
      );
      if (!res.ok) {
        throw new Error("Update failed");
      }
      const updatedSupplier = await res.json();
      setSupplier(updatedSupplier);
      setOriginalSupplier(updatedSupplier);

      alert("Supplier Details updated");
      fetchSupplier();
    } catch (err) {
      console.error(err);
      alert("Failed to update Supplier details");
    }
  };

  return (
    <div className="bg-white w-5/6 mx-auto my-8 p-8 border-2 border-gray-300">
      {loading || !Supplier ? (
        <div className="flex justify-between">
          <p>Loading...</p>
          <button
            className="mb-6 px-2 border-2 border-gray-600 hover:bg-gray-600 hover:text-white"
            onClick={() => setLoadSupplierDetail(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="font-bold text-3xl mb-6">
              <input
                type="text"
                value={Supplier.supplierName}
                onChange={(e) =>
                  setSupplier({ ...Supplier, supplierName: e.target.value })
                }
                className="border border-black px-2 py-1"
                placeholder="Supplier Name"
              />
            </div>
            <button
              className="mb-6 px-2 border-2 border-gray-600 hover:bg-gray-600 hover:text-white"
              onClick={() => setLoadSupplierDetail(false)}
            >
              Back
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Company Name</label>
              <input
                type="text"
                value={Supplier.companyName}
                onChange={(e) =>
                  setSupplier({ ...Supplier, companyName: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email</label>
              <input
                type="email"
                value={Supplier.email}
                onChange={(e) =>
                  setSupplier({ ...Supplier, email: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Phone</label>
              <input
                type="tel"
                value={Supplier.phone}
                onChange={(e) =>
                  setSupplier({ ...Supplier, phone: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* GST Number */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">GST Number</label>
              <input
                type="text"
                value={Supplier.gstNumber}
                onChange={(e) =>
                  setSupplier({ ...Supplier, gstNumber: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Address</label>
              <textarea
                value={Supplier.address}
                onChange={(e) =>
                  setSupplier({ ...Supplier, address: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">City</label>
              <input
                type="text"
                value={Supplier.city}
                onChange={(e) =>
                  setSupplier({ ...Supplier, city: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">State</label>
              <input
                type="text"
                value={Supplier.state}
                onChange={(e) =>
                  setSupplier({ ...Supplier, state: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="bg-yellow-400 px-4 py-2 hover:bg-yellow-500"
              onClick={handleEdit}
            >
              Save Changes
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
              onClick={() => handleDelete(supplierId)}
            >
              Delete Supplier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SupplierDetail;
