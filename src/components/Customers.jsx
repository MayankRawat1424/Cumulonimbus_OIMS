import React from "react";
import { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";
import CustomerNav from "./ProductNav";

const Customer = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/customers");
      const data = await res.json();
      setCustomer(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <>
      {open && (
        <CustomerForm onCustomerCreated={fetchCustomer} setOpen={setOpen} />
      )}
      <div className="grid grid-cols-5 h-screen mx-8">
        <div className="col-span-1">
          <CustomerNav />
        </div>
        <div className="col-span-4">
          <CustomerTable
            customers={customers}
            loading={loading}
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Customer;
