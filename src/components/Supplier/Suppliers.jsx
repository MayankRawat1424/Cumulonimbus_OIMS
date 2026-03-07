import React, { useState, useEffect } from "react";
import SupplierForm from "./SupplierForm";
import SupplierTable from "./SupplierTable";
import SupplierNav from "./SupplierNav";
import SupplierDetail from "./SupplierDetail";

const Suppliers = () => {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState("Suppliers");
  const [loadSupplierDetail, setLoadSupplierDetail] = useState(false);
  const [supplierId, setSupplierId] = useState(null);

  const fetchSupplier = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/suppliers");
      const data = await res.json();
      setSuppliers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <>
      {open && (
        <SupplierForm setOpen={setOpen} onSupplierCreated={fetchSupplier} />
      )}
      <div className="grid grid-cols-5 h-screen ml-8 pr-8 bg-neutral-50">
        <div className="col-span-1">
          <SupplierNav setNav={setNav} />
        </div>

        {loadSupplierDetail ? (
          <div className="col-span-4">
            <SupplierDetail
              setLoadSupplierDetail={setLoadSupplierDetail}
              supplierId={supplierId}
              fetchSupplier={fetchSupplier}
            />
          </div>
        ) : nav === "Supplier List" ? (
          <div className="col-span-4">
            <SupplierTable
              setOpen={setOpen}
              loading={loading}
              suppliers={suppliers}
              setLoadSupplierDetail={setLoadSupplierDetail}
              setSupplierId={setSupplierId}
            />
          </div>
        ) : nav === "Create Order" ? (
          <div className="col-span-4"></div>
        ) : nav === "Order History" ? (
          <div className="col-span-4"></div>
        ) : (
          setNav("Supplier List")
        )}
      </div>
    </>
  );
};

export default Suppliers;
