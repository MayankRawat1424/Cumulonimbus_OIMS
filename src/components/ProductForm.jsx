import React from "react";
import { useState } from "react";

const ProductForm = () => {
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    price: 0,
    quantity: 0,
  });

  const validateForm = () => {
    if (form.productName === "") {
      alert("Product name is required");
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
    } catch (error) {
      console.log("Fuck", error);
    }
  };

  return (
    <div className="w-2xl py-4 px-6 mx-auto mt-16 border border-black shadow-lg">
      <h1 className="font-bold text-3xl mb-6">Products</h1>
      <form action="" className="flex flex-col ">
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          className="border border-black mb-4 px-1"
          value={form.productName}
          onChange={(e) => {
            setForm({ ...form, productName: e.target.value });
          }}
        />

        <label htmlFor="">Product Description</label>
        <input
          type="text"
          className="border border-black mb-4 px-1"
          value={form.productDescription}
          onChange={(e) =>
            setForm({ ...form, productDescription: e.target.value })
          }
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
