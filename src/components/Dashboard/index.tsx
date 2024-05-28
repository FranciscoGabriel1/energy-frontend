// Arquivo: src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";

import { Container, TextField, MenuItem } from "@mui/material";
import { Invoice } from "../../models/Invoices";
import { fetchInvoices } from "../../services/ApiService";
import EnergyChart from "../EnergyChart";

const Dashboard: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  useEffect(() => {
    fetchInvoices().then(setInvoices);
  }, []);

  const customers = Array.from(
    new Set(invoices.map((invoice) => invoice.customerNumber))
  );

  const filteredData = invoices.filter(
    (invoice) =>
      invoice.customerNumber === selectedCustomer || selectedCustomer === ""
  );

  return (
    <Container>
      <TextField
        select
        label="Número do Cliente"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: "20px", color: "white" }}
      >
        {customers.map((customer) => (
          <MenuItem key={customer} value={customer}>
            {customer}
          </MenuItem>
        ))}
      </TextField>
      <EnergyChart data={filteredData} type="energy" />
      <EnergyChart data={filteredData} type="money" />
    </Container>
  );
};

export default Dashboard;
