import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import ProductNav from "./ProductNav";
import ProductDetail from "./ProductDetail";
import InventoryValuation from "./InventoryValuation";
import OutOfStock from "./OutOfStock";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProductDetail, setLoadProductDetail] = useState(false);
  const [productId, setProductId] = useState("");

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
      {open && (
        <ProductForm onProductCreated={fetchProduct} setOpen={setOpen} />
      )}
      <div className="grid grid-cols-5 h-screen mx-8">
        <div className="col-span-1">
          <ProductNav />
        </div>
        {loadProductDetail ? (
          <div className="col-span-4">
            <ProductDetail
              setLoadProductDetail={setLoadProductDetail}
              productId={productId}
            />
          </div>
        ) : (
          <div className="col-span-4">
            <ProductTable
              products={products}
              loading={loading}
              setOpen={setOpen}
              setLoadProductDetail={setLoadProductDetail}
              setProductId={setProductId}
            />
            {/* <InventoryValuation /> */}
            <OutOfStock
              products={products}
              loading={loading}
              setOpen={setOpen}
              setLoadProductDetail={setLoadProductDetail}
              setProductId={setProductId}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
