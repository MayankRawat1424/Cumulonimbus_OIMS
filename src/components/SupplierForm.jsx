import React from "react";
import { useState } from "react";

const SupplierForm = () => {
  const initialFormState = {
    productName: "",
    productDescription: "",
    color: "#ffffff",
    subCategory: "",
    model: "",
    price: 0,
    quantity: 0,
    unit: "",
    stock: "0",
  };

  const SubCategories = [{ id: 1, value: "electronics", label: "Electronics" }];

  const [form, setForm] = useState(initialFormState);

  const validateForm = () => {
    if (form.productName === "") {
      alert("Product name is required");
      return false;
    }
    if (form.quantity <= 0) {
      alert("Quantity must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log("Success", data);
      alert("Created Product");
      setForm(initialFormState);
    } catch (error) {
      console.log("Fuck", error);
    }
  };

  return (
    <div className="w-2xl py-4 px-6 mx-auto mt-16 shadow-lg bg-white rounded-md">
      <h1 className="font-bold text-3xl mb-6">Create Products</h1>
      <form action="" className="flex flex-col ">
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          className="border border-black mb-4 px-1"
          value={form.productName}
          onChange={(e) => {
            setForm({ ...form, productName: e.target.value });
          }}
          placeholder="product name"
        />

        <label htmlFor="">Product Description</label>
        <textarea
          className="border border-black mb-4 px-1"
          value={form.productDescription}
          onChange={(e) =>
            setForm({ ...form, productDescription: e.target.value })
          }
          placeholder="Describe the product"
        />

        <label for="colorPicker">Color</label>
        <input
          type="color"
          id="colorPicker"
          name="colorPicker"
          className="w-full mb-4"
          value={form.color}
          onChange={(e) => {
            setForm({ ...form, color: e.target.value });
          }}
        />

        <label for="">Sub-Category</label>
        <select
          className="border border-black mb-4 px-1 py-1"
          value={form.subCategory}
          onChange={(e) => {
            setForm({ ...form, subCategory: e.target.value });
          }}
        >
          <option value="">SELECT SUB CATEGORY</option>

          {SubCategories.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <label htmlFor="">Model</label>
        <input
          type="text"
          className="border border-black mb-4 px-1"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          placeholder="Make/ Model/ Year"
        />

        <label htmlFor="">Price</label>
        <input
          type="number"
          className="border border-black mb-4 px-1"
          value={form.price}
          onChange={(e) => {
            setForm({ ...form, price: e.target.value });
          }}
        />

        <label htmlFor="">Quantity</label>
        <input
          type="number"
          className="border border-black mb-4 px-1"
          value={form.quantity}
          onChange={(e) => {
            setForm({ ...form, quantity: e.target.value });
          }}
        />

        <label htmlFor="">Unit</label>
        <input
          type="text"
          className="border border-black mb-4 px-1"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          placeholder="kg/ ml/ fl/ oz"
        />

        <label htmlFor="">Stock</label>
        <input
          type="number"
          className="border border-black mb-4 px-1"
          value={form.stock}
          onChange={(e) => {
            setForm({ ...form, stock: e.target.value });
          }}
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
