import React from "react";
import { useState } from "react";

const SupplierForm = ({ onSupplierCreated, setOpen }) => {
  const initialFormState = {
    supplierName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    gstNumber: "",
  };

  const [form, setForm] = useState(initialFormState);

  const validateForm = () => {
    if (form.supplierName === "") {
      alert("Supplier name is required");
      return false;
    }
    if (form.companyName === "") {
      alert("Company name is required");
      return false;
    }
    if (form.email === "") {
      alert("Email is required");
      return false;
    }

    if (form.phone === "") {
      alert("Phone Number is required");
      return false;
    }

    if (form.gstNumber === "") {
      alert("GST number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log("Success", data);
      alert("Created Supplier");
      setForm(initialFormState);
      setOpen(false);
      onSupplierCreated();
    } catch (error) {
      console.log("Fuck (from mudit)", error);
    }
  };

  return (
    <div className="w-2/5 py-6 px-8 mx-auto shadow-lg/20 bg-white fixed inset-8 overflow-y-scroll border-2 border-gray-400">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6 ">Create Supplier</h1>
        <button
          className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </button>
      </div>

      <form action="" className="flex flex-col">
        <label htmlFor="" className="pb-1 font-semibold">
          Supplier Name
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.supplierName}
          onChange={(e) => {
            setForm({ ...form, supplierName: e.target.value });
          }}
          placeholder="Supplier name"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Supplier Address
        </label>
        <input
          className="border border-black mb-6 p-1"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Enter suppliers address"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Company Name
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          placeholder="Enter Company Name"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Email
        </label>
        <input
          type="email"
          className="border border-black mb-6 p-1"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          placeholder="example123@abc.com"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Phone_Number
        </label>
        <input
          type="tel"
          className="border border-black mb-6 p-1"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Enter Phone number"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          City
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <label htmlFor="" className="pb-1 font-semibold">
          State
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <label htmlFor="" className="pb-1 font-semibold">
          GST_Number
        </label>
        <input
          type="text"
          className="border border-black mb-4 p-1"
          value={form.gstNumber}
          onChange={(e) => {
            setForm({ ...form, gstNumber: e.target.value });
          }}
          placeholder="GSTIN-XXXX"
        />

        <button
          className="bg-blue-500 text-white p-2 w-32 my-4 hover:bg-blue-600 hover:cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SupplierForm;
