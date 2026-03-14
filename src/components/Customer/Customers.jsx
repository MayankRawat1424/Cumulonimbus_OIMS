import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";
import CustomerNav from "./CustomerNav";
import CustomerDetail from "./CustomerDetail";

const Customer = () => {

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState("Customer List");
  const [loadCustomerDetail, setLoadCustomerDetail] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/customers");
      const data = await res.json();
      setCustomers(data);
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
        <CustomerForm
          onCustomerCreated={fetchCustomer}
          setOpen={setOpen}
        />
      )}
      <div className="grid grid-cols-5 min-h-screen px-6 bg-gray-100">
        <div className="col-span-1 -ml-6">
          <CustomerNav setNav={setNav} />
        </div>
        {loadCustomerDetail ? (
          <div className="col-span-4">
            <CustomerDetail
              setLoadCustomerDetail={setLoadCustomerDetail}
              customerId={customerId}
              fetchCustomer={fetchCustomer}
            />
          </div>
        ) : nav === "Customer List" ? (
          <div className="col-span-4">
            <CustomerTable
              setOpen={setOpen}
              loading={loading}
              customers={customers}
              setLoadCustomerDetail={setLoadCustomerDetail}
              setCustomerId={setCustomerId}
            />
          </div>
        ) : (
          setNav("Customer List")
        )}
      </div>
    </>
  );
};

export default Customer;