import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const RecentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData?.token;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v2/auth/customer/payment-history",
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
          console.log(res.data.payments);
        } else {
          toast.error(res.data.message || "Unable to fetch payment history");
        }
      } catch (error) {
        console.error("Payment history fetch failed:", error);
        toast.error("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 4,
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          Payment History
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : payments.length === 0 ? (
          <Typography align="center" variant="body1">
            No payment history found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#eceff1" }}>
                <TableRow>
                  <TableCell>
                    <strong>Order ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Payment Id</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment.orderId}</TableCell>
                    <TableCell>{payment.razorpay_payment_id}</TableCell>
                    <TableCell>₹{payment.amountPaid}</TableCell>

                    <TableCell
                      sx={{
                        color:
                          payment.paymentStatus === "completed"
                            ? "green"
                            : "red",
                      }}
                    >
                      {payment.paymentStatus}
                    </TableCell>
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
    </Box>
  );
};

export default RecentPayments;
