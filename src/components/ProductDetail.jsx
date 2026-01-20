import React, { useEffect, useState } from "react";
import tempImg from "../assets/temp.png";

const ProductDetail = ({ setLoadProductDetail, productId }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${productId}`,
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [productId]);

  const handleDelete = async (productId) => {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    setProduct(null);
    alert("Product Deleted");
    setLoadProductDetail(false);
  };

  return (
    <div className="bg-white w-5/6 mx-auto mt-8 p-8 border-2 border-gray-300">
      {loading ? (
        <div className="flex justify-between">
          <p>loading</p>
          <button
            className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
            onClick={() => {
              setLoadProductDetail(false);
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl mb-6">{product.productName}</h1>
            <button
              className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
              onClick={() => {
                setLoadProductDetail(false);
              }}
            >
              Back
            </button>
          </div>
          <div>
            <img
              src={tempImg}
              alt="Item Picture"
              height={200}
              width={200}
              className="mb-8"
            />
            <form action="" className="flex flex-col"></form>
            <p className="mb-1">
              <strong>Description : </strong>
              {product.productDescription}
            </p>

            <div className="grid grid-cols-2">
              <p className="mb-1">
                <strong>Sub Category : </strong>
                {product.subCategory}
              </p>
              <p className="mb-1">
                <strong>Model : </strong>
                {product.model}
              </p>
              <p className="mb-1">
                <strong>Price : </strong>
                {product.price}
              </p>
              <p className="mb-1">
                <strong>Quantity : </strong>
                {product.quantity} {product.unit}
              </p>
              <p className="mb-1">
                <strong>In stock : </strong>
                {product.stock}
              </p>
            </div>
          </div>
          <button
            className="bg-red-500 text-white p-2 w-32 my-4 hover:bg-red-600 hover:cursor-pointer"
            onClick={() => {
              handleDelete(productId);
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
