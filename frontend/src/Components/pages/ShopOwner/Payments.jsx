import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const shopAuth = JSON.parse(localStorage.getItem("shopAuth"));
  const token = shopAuth?.token;

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v2/auth/shop/payment",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setPayments(res.data.payments);
        } else {
          toast.error(res.data.message || "Failed to fetch payments.");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Received Payments
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : payments.length === 0 ? (
        <Typography align="center" variant="body1" color="textSecondary">
          No payments received yet.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1000, margin: "auto" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Amount (₹)</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.orderId}</TableCell>
                  <TableCell>{payment.customerId.name}</TableCell>
                  <TableCell>₹{payment.amountPaid}</TableCell>
                  <TableCell>{payment.paymentStatus}</TableCell>
                  <TableCell>
                    {new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Payments;
