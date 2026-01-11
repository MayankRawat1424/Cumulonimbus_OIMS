import React from "react";
import { useState } from "react";

const ProductForm = ({ onProductCreated, setOpen }) => {
  const initialFormState = {
    productName: "",
    productDescription: "",
    color: "#D1D5DB",
    subCategory: "",
    model: "",
    price: 0,
    quantity: 0,
    unit: "",
    stock: "0",
  };

  const SubCategories = [
    { id: 1, value: "electronics", label: "Electronics" },
    { id: 2, value: "consumables", label: "Consumables" },
    { id: 3, value: "domestic_goods", label: "Domestic Goods" },
    { id: 4, value: "chemicals", label: "Chemicals" },
    { id: 5, value: "medical", label: "Medical" },
    { id: 6, value: "industrial", label: "Industrial" },
    { id: 7, value: "stationery", label: "Stationery" },
  ];

  const [form, setForm] = useState(initialFormState);

  const validateForm = () => {
    if (form.productName === "") {
      alert("Product name is required");
      return false;
    }
    if (form.unit === "") {
      alert("Unit for measurement is required");
      return false;
    }

    if (form.price <= 0) {
      alert("Price must be greater than 0");
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

      onProductCreated();
    } catch (error) {
      console.log("Fuck", error);
    }
  };

  return (
    <div className="w-2/5 py-4 px-8 mx-auto shadow-lg bg-white fixed inset-8 overflow-y-scroll">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6 ">Create Product</h1>
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
          Product Name
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.productName}
          onChange={(e) => {
            setForm({ ...form, productName: e.target.value });
          }}
          placeholder="product name"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Product Description
        </label>
        <textarea
          className="border border-black mb-6 px-1 h-32"
          value={form.productDescription}
          onChange={(e) =>
            setForm({ ...form, productDescription: e.target.value })
          }
          placeholder="Describe the product"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Color
        </label>
        <input
          type="color"
          id="colorPicker"
          name="colorPicker"
          className="w-full mb-6"
          value={form.color}
          onChange={(e) => {
            setForm({ ...form, color: e.target.value });
          }}
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Sub-Category
        </label>
        <select
          className="border border-black mb-6 px-1 py-1"
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

        <label htmlFor="" className="pb-1 font-semibold">
          Model
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          placeholder="Make/ Model/ Year"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Price
        </label>
        <input
          type="number"
          className="border border-black mb-6 p-1"
          value={form.price}
          onChange={(e) => {
            setForm({ ...form, price: e.target.value });
          }}
          min={0}
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Quantity
        </label>
        <input
          type="number"
          className="border border-black mb-6 p-1"
          value={form.quantity}
          onChange={(e) => {
            setForm({ ...form, quantity: e.target.value });
          }}
          min={0}
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Unit
        </label>
        <input
          type="text"
          className="border border-black mb-6 p-1"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          placeholder="kg/ ml/ fl/ oz"
        />

        <label htmlFor="" className="pb-1 font-semibold">
          Stock
        </label>
        <input
          type="number"
          className="border border-black mb-4 p-1"
          value={form.stock}
          onChange={(e) => {
            setForm({ ...form, stock: e.target.value });
          }}
          min={0}
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

export default ProductForm;
