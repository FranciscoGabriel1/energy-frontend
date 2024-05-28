import axios from "axios";
import { Invoice } from "../models/Invoices";

const baseUrl = "http://localhost:3000/get-invoice";

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await axios.get<Invoice[]>(baseUrl);
  return response.data;
};
