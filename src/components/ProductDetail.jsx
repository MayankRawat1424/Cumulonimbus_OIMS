import React, { useEffect, useState } from "react";
import tempImg from "../assets/temp.png";

const ProductDetail = ({ setLoadProductDetail, productId }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${productId}`
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

  return (
    <div>
      {loading ? (
        <div>
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
          <div>
            <h1>{product.productName}</h1>
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
            <img src={tempImg} alt="Item Picture" />
            <p>
              <strong>Description : </strong>
              {product.productDescription}
            </p>
            <p>
              <strong>Sub Category : </strong>
              {product.subCategory}
            </p>
            <p>
              <strong>model : </strong>
              {product.model}
            </p>
            <p>
              <strong>price : </strong>
              {product.price}
            </p>
            <p>
              <strong>quantity : </strong>
              {product.quantity} {product.unit}
            </p>
            <p>
              <strong>In stock : </strong>
              {product.stock}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
