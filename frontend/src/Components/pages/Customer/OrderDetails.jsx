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
  Button,
  Paper,
  Divider,
} from "@mui/material";
import handlePayment from "../../../utils/razorpayPayment";
import axios from "axios";
import toast from "react-hot-toast";

const OrderDetails = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null);
  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData?.token;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v2/auth/customer/order/${orderId}`,
          {
            headers: {
              Authorization: token,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setOrderData(res.data.order);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to fetch order.");
      }
    };
    fetchOrder();
  }, [orderId, token]);

  const handlePaymentClick = () => {
    handlePayment({ orderData, token, setOrderData });
  };

  if (!orderData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography align="center">Loading order details...</Typography>
      </Box>
    );
  }

  const paymentStatus = orderData.isPaid ? "Paid" : "Pending";

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Order Summary
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Order ID:</strong> {orderData._id}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Status:</strong> {orderData.order_status}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Payment:</strong> {paymentStatus}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Total Amount:</strong> ₹{orderData.total_amount}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Order Date:</strong>{" "}
          {new Date(orderData.updatedAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Customer
        </Typography>
        <Typography>
          {orderData.customer_id.name} ({orderData.customer_id.email})
        </Typography>
        <Typography>{orderData.customer_id.phone_number}</Typography>
        <Typography>{orderData.customer_id.address}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shop
        </Typography>
        <Typography>
          {orderData.shopOwner_id.shop_name} - {orderData.shopOwner_id.name}
        </Typography>
        <Typography>{orderData.shopOwner_id.email}</Typography>
        <Typography>{orderData.shopOwner_id.phone_number}</Typography>
        <Typography>{orderData.shopOwner_id.shop_address}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Clothes & Services
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Cloth</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.request_id.clothes.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {orderData.request_id.service_type.join(", ")}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!orderData.isPaid && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePaymentClick}
          >
            Pay ₹{orderData.total_amount}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OrderDetails;
