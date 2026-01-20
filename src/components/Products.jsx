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
  const [nav, setNav] = useState("Inventory");

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
      <div className="grid grid-cols-5 h-screen ml-8 pr-8 bg-neutral-50">
        <div className="col-span-1">
          <ProductNav setNav={setNav} />
        </div>
        {loadProductDetail ? (
          <div className="col-span-4">
            <ProductDetail
              setLoadProductDetail={setLoadProductDetail}
              productId={productId}
              fetchProduct={fetchProduct}
            />
          </div>
        ) : nav === "Inventory" ? (
          <div className="col-span-4">
            <ProductTable
              products={products}
              loading={loading}
              setOpen={setOpen}
              setLoadProductDetail={setLoadProductDetail}
              setProductId={setProductId}
            />
          </div>
        ) : nav === "Stock Valuation" ? (
          <div className="col-span-4">
            <InventoryValuation />
          </div>
        ) : nav === "Out of Stock Items" ? (
          <div className="col-span-4">
            <OutOfStock
              products={products}
              loading={loading}
              setOpen={setOpen}
              setLoadProductDetail={setLoadProductDetail}
              setProductId={setProductId}
            />
          </div>
        ) : (
          setNav("Inventory")
        )}
      </div>
    </>
  );
};

export default Products;
