import React, { useState, useEffect } from "react";
import SupplierForm from "./SupplierForm";
import SupplierTable from "./SupplierTable";

const Suppliers = () => {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <SupplierTable
        setOpen={setOpen}
        loading={loading}
        suppliers={suppliers}
      />
    </>
  );
};

export default Suppliers;
