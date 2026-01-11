import React from "react";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <ProductForm onProductCreated={fetchProduct} />
      <ProductTable products={products} loading={loading} />
    </>
  );
};

export default Products;
