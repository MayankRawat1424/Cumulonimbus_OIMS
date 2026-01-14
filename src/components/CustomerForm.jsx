import React from "react";
import { useState } from "react";

const CustomerForm = ({ onCustomerCreated, setOpen }) => {
  const initialFormState = {
    customerName: "",
    phone: "",
    email: "",
    address: "",
    age: 0,
    gender: "",
  };

  const [form, setForm] = useState(initialFormState);

  const validateForm = () => {
    if (form.customerName === "") {
      alert("Customer name is required");
      return false;
    }
    if (form.phone === "") {
      alert("Contact details are required");
      return false;
    }

    if (form.email === "") {
      alert("Plz enter a valid email");
      return false;
    }

    if (form.age <= 0) {
      alert("age must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log("Success", data);
      alert("Created Customer");
      setForm(initialFormState);
      setOpen(false);
      onCustomerCreated();
    } catch (error) {
      console.log("Fuck", error);
    }
  };

  return (
    <div className="w-2/5 py-6 px-8 mx-auto shadow-lg/20 bg-white fixed inset-8 overflow-y-scroll border-2 border-gray-500">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6 ">Create Customer</h1>
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
          Customer Name
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.customerName}
          onChange={(e) => {
            setForm({ ...form, customerName: e.target.value });
          }}
          placeholder="Customer name"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Phone
        </label>
        <input
          type="tel"
          className="border border-black mb-6 p-1"
          value={form.phone}
          onChange={(e) => {
            setForm({ ...form, phone: e.target.value });
          }}
          placeholder="Contact details(phone number)"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Email
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          placeholder="Email"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          address
        </label>
        <textarea
          className="border border-black mb-6 px-1 h-32"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          placeholder="Address"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Age
        </label>
        <input
          type="number"
          className="border border-black mb-6 p-1"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          placeholder="Age"
          min={0}
        />

        <label className="pb-1 font-semibold">Gender</label>

<div className="flex gap-6 mb-6">

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="gender"
      value="Male"
      checked={form.gender === "Male"}
      onChange={(e) => setForm({ ...form, gender: e.target.value })}
    />
    Male
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="gender"
      value="Female"
      checked={form.gender === "Female"}
      onChange={(e) => setForm({ ...form, gender: e.target.value })}
    />
    Female
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="gender"
      value="Loser"
      checked={form.gender === "Loser"}
      onChange={(e) => setForm({ ...form, gender: e.target.value })}
    />
    Loser
  </label>

</div>


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

export default CustomerForm;
