import React, { useEffect, useState } from "react";
import tempImg from "../assets/temp.png";

const ProductDetail = ({ setLoadProductDetail, productId, fetchProduct }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${productId}`,
        );
        const data = await res.json();
        setProduct(data);
        setOriginalProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [productId]);

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        throw new Error("Update failed");
      }
      setProduct(null);
      alert("Product Deleted");
      fetchProduct();
      setLoadProductDetail(false);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleEdit = async () => {
    if (JSON.stringify(product) === JSON.stringify(originalProduct)) {
      alert("No edits to save!");
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );
      if (!res.ok) {
        throw new Error("Update failed");
      }
      const updatedProduct = await res.json();
      setProduct(updatedProduct);
      setOriginalProduct(updatedProduct);

      alert("Product Details updated");
      fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Failed to update product details");
    }
  };

  return (
    <div className="bg-white w-5/6 mx-auto my-8 p-8 border-2 border-gray-300">
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
            <div className="font-bold text-3xl mb-6 ">
              <input
                type="text"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
                className="border border-black px-1"
              />
            </div>
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
            <div className="mb-1 flex flex-col">
              <label htmlFor="" className="font-semibold mb-1">
                Description
              </label>
              <textarea
                value={product.productDescription}
                onChange={(e) =>
                  setProduct({ ...product, productDescription: e.target.value })
                }
                className="border border-black px-1 mb-4 mr-16"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 items-center">
              <div className="mb-1 flex flex-col">
                <label htmlFor="" className="font-semibold mb-1">
                  Sub Category
                </label>
                <input
                  type="text"
                  value={product.subCategory}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      subCategory: e.target.value,
                    })
                  }
                  className="border border-black p-1 mr-16 mb-4"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="" className="font-semibold mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={product.model}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      model: e.target.value,
                    })
                  }
                  className="border border-black p-1 mr-16 mb-4"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="" className="font-semibold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: e.target.value,
                    })
                  }
                  min={0}
                  className="border border-black p-1 mr-16 mb-4"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="" className="font-semibold mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      quantity: e.target.value,
                    })
                  }
                  min={0}
                  className="border border-black p-1 mr-16 mb-4"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="" className="font-semibold mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={product.unit}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      unit: e.target.value,
                    })
                  }
                  className="border border-black p-1 mr-16 mb-4"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="" className="font-semibold mb-1">
                  In Stock
                </label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      stock: e.target.value,
                    })
                  }
                  min={0}
                  className="border border-black p-1 mr-16 mb-4"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 justify-between">
            <button
              className="bg-yellow-300 text-black p-2 w-32 my-4 hover:bg-yellow-400 hover:cursor-pointer"
              onClick={() => {
                handleEdit();
              }}
            >
              Save Changes
            </button>
            <button
              className="bg-red-500 text-white p-2 w-32 my-4 hover:bg-red-600 hover:cursor-pointer"
              onClick={() => {
                handleDelete(productId);
              }}
            >
              Delete Item
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
