import React, { useEffect, useState } from "react";

const CustomerDetail = ({
  setLoadCustomerDetail,
  customerId,
  fetchCustomer,
}) => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [originalCustomer, setOriginalCustomer] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/customers/${customerId}`
        );
        const data = await res.json();
        setCustomer(data);
        setOriginalCustomer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [customerId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/customers/${customerId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      alert("Customer Deleted");
      fetchCustomer();
      setLoadCustomerDetail(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    if (JSON.stringify(customer) === JSON.stringify(originalCustomer)) {
      alert("No edits to save!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updatedCustomer = await res.json();

      setCustomer(updatedCustomer);
      setOriginalCustomer(updatedCustomer);

      alert("Customer Updated Successfully");
      fetchCustomer();
    } catch (err) {
      console.error(err);
      alert("Failed to update customer");
    }
  };

  return (
    <div className="bg-white w-5/6 mx-auto my-8 p-8 border-2 border-gray-300">
      {loading || !customer ? (
        <div className="flex justify-between">
          <p>Loading...</p>
          <button
            className="mb-6 px-2 border-2 border-gray-600 hover:bg-gray-600 hover:text-white"
            onClick={() => setLoadCustomerDetail(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="font-bold text-3xl mb-6">Customer Details</h2>

            <button
              className="mb-6 px-2 border-2 border-gray-600 hover:bg-gray-600 hover:text-white"
              onClick={() => setLoadCustomerDetail(false)}
            >
              Back
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            {/* Customer Name */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Customer Name</label>
              <input
                type="text"
                value={customer.customerName}
                onChange={(e) =>
                  setCustomer({ ...customer, customerName: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Phone</label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Age</label>
              <input
                type="number"
                value={customer.age}
                onChange={(e) =>
                  setCustomer({ ...customer, age: e.target.value })
                }
                className="border border-black p-2"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Gender</label>
              <select
                value={customer.gender}
                onChange={(e) =>
                  setCustomer({ ...customer, gender: e.target.value })
                }
                className="border border-black p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Address</label>
              <textarea
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
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
              onClick={handleDelete}
            >
              Delete Customer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDetail;