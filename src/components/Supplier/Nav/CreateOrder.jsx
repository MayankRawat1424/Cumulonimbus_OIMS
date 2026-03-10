import React, { useEffect, useState } from "react";

const CreateOrder = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error(err));
  }, []);

  const addItem = () => {
    const product = products.find((p) => p.id === Number(selectedProduct));
    if (!product) return;

    const existingItem = orderItems.find((i) => i.productId === product.id);

    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * item.price,
              }
            : item,
        ),
      );
    } else {
      const item = {
        productId: product.id,
        productName: product.productName,
        price: product.price,
        quantity,
        total: product.price * quantity,
      };

      setOrderItems([...orderItems, item]);
    }

    setSelectedProduct("");
    setQuantity(1);
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

  //   const availableProducts = products.filter((p) => p.stock > 0);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async () => {
    if (!selectedSupplier) {
      alert("Please select a supplier");
      return;
    }

    if (orderItems.length === 0) {
      alert("Add at least one product");
      return;
    }

    const orderData = {
      supplierId: Number(selectedSupplier),
      items: orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/api/supplierOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      alert("Order placed successfully");

      // Reset form
      setOrderItems([]);
      setSelectedSupplier("");
      setSelectedProduct("");
      setQuantity(1);
      setSearch("");
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <div className="bg-white w-5/6 mx-auto my-8 p-8 shadow-md">
      <h1 className="text-3xl font-bold mb-6 font-heading">
        Create Supplier Order
      </h1>

      {/* Search */}
      <div className="mb-6 flex flex-col">
        <label className="font-semibold mb-1">Search Product</label>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black p-1 w-1/2"
        />
      </div>

      {/* Product Selection */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Product</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border border-black p-1"
          >
            <option value="">Select Product</option>

            {filteredProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.productName} (Stock: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-black p-1"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Order Items */}
      <h2 className="text-xl font-semibold mb-4">Order Items</h2>

      <table className="w-full border border-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.productName}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Total */}
      <div className="flex justify-end mt-6 text-xl font-bold">
        Total: ₹{totalAmount}
      </div>

      {/* Out of Stock List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Out of Stock Products
        </h2>

        <ul className="border border-gray-300 p-4">
          {outOfStockProducts.length === 0 ? (
            <p className="text-gray-500">No out-of-stock items</p>
          ) : (
            outOfStockProducts.map((p) => (
              <li key={p.id} className="border-b py-1">
                {p.productName}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Supplier Selection */}
      <div className="mb-6 flex flex-col">
        <label className="font-semibold mb-1">Supplier</label>

        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          className="border border-black p-1 w-1/2"
        >
          <option value="">Select Supplier</option>

          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.supplierName}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
