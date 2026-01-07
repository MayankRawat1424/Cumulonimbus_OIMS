import React from "react";

const ProductForm = () => {
  return (
    <div className="w-2xl py-4 px-6 mx-auto mt-16 border border-black shadow-lg">
      <h1 className="font-bold text-3xl mb-6">Products</h1>
      <form action="" className="flex flex-col ">
        <label htmlFor="">Product Name</label>
        <input type="text" className="border border-black mb-4" />

        <label htmlFor="">Product Description</label>
        <input type="text" className="border border-black mb-4" />

        <label htmlFor="">Price</label>
        <input type="number" className="border border-black mb-4" />

        <label htmlFor="">Quantity</label>
        <input type="number" className="border border-black mb-4" />

        <button className="bg-blue-500 text-white p-2 w-32 my-4 hover:bg-blue-600 hover:cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
