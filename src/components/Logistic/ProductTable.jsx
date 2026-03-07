import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const ProductTable = ({
  setLoadProductDetail,
  products,
  loading,
  setOpen,
  setProductId,
  setPage,
  page,
  totalPages,
}) => {
  if (loading) return <p>Loading products...</p>;

  return (
    <div className="bg-white w-5/6 mx-auto mt-8 p-8 border-2 border-gray-300">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6">Inventory</h1>
        <button
          className="mb-6 px-2 border-2 border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:bg-gray-800"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Product
        </button>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-gray-600 mb-4">No product found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-300 text-gray-800 text-left">
                <th className="px-2 py-1">id</th>
                <th className="px-2 py-1">Product</th>
                <th className="px-2 py-1">Category</th>
                <th className="px-2 py-1">Price</th>
                <th className="px-2 py-1">Quantity</th>
                <th className="px-2 py-1">In Stock</th>
              </tr>
            </thead>
            <tbody className="">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-300 hover:cursor-pointer hover:inset-shadow-sm hover:bg-gray-50"
                  onClick={() => {
                    setLoadProductDetail(true);
                    setProductId(product.id);
                  }}
                >
                  <td className="px-2 py-1">{product.id}</td>
                  <td className="px-2 py-1">{product.productName}</td>
                  <td className="px-2 py-1 max-w-32">{product.subCategory}</td>
                  <td className="px-2 py-1">{product.price}</td>
                  <td className="px-2 py-1">
                    {product.quantity} {product.unit}
                  </td>
                  <td className="px-2 py-1">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex mt-8 justify-center items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 hover:scale-140 transistion-transform duration-100"
            >
              <FaChevronLeft />
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 hover:scale-140 transistion-transform duration-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
