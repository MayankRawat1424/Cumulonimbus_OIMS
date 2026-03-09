import React from "react";

const OutOfStock = ({
  setLoadProductDetail,
  products,
  loading,
  setProductId,
}) => {
  if (loading) return <p>Loading products...</p>;

  const outOfStockProducts = products.filter((p) => p.stock === 0);

  return (
    <div className="bg-white ml-6 mx-auto mt-8 p-8 h-fit shadow-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-6">Out of Stock Products</h1>
      </div>

      {!outOfStockProducts || outOfStockProducts.length === 0 ? (
        <p className="text-gray-600 mb-4">No out-of-stock products</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-neutral-800 text-white text-left">
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">Product</th>
                <th className="px-2 py-2">Category</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Quantity</th>
                <th className="px-2 py-2">In Stock</th>
              </tr>
            </thead>

            <tbody>
              {outOfStockProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-300 hover:bg-gray-50 hover:cursor-pointer"
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
        </div>
      )}
    </div>
  );
};

export default OutOfStock;
