import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const OrderDetails = ({ orderId }) => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const authData = JSON.parse(localStorage.getItem("shopAuth"));
  const token = authData?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v2/auth/shop/order/${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setOrderData(res.data.order);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch order.");
      }
    };
    fetchOrders();
  }, [orderId, token]);

  const handleStatusUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v2/auth/shop/order/update-status/${orderId}`,
        { order_status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Order status updated successfully!");
        setOrderData((prev) => ({ ...prev, order_status: newStatus }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", p: 3 }}>
      {orderData ? (
        <Box
          sx={{
            p: 4,
            maxWidth: 900,
            margin: "auto",
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          {/* Header */}
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
          >
            Vastrashuddhi Laundry Service
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 3, color: "#555" }}>
            Shop Order Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Order Details */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Order Details:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography>
                <strong>Order ID:</strong> {orderData._id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Status:</strong> {orderData.order_status}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Payment:</strong> {orderData.payment_status}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Total Amount:</strong> ₹{orderData.total_amount}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Order Date:</strong>{" "}
                {new Date(orderData.updatedAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Total Quantity:</strong>{" "}
                {orderData.request_id.total_quantity}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Update Status</InputLabel>
                <Select
                  value={newStatus}
                  label="Update Status"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="Ready for delivery">
                    Ready for delivery
                  </MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleStatusUpdate}
                disabled={!newStatus || newStatus === orderData.order_status}
              >
                Update Status
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Customer Details */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Customer Details:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography>
                <strong>Name:</strong> {orderData.customer_id.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Email:</strong> {orderData.customer_id.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Address:</strong> {orderData.customer_id.address}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Contact No:</strong>{" "}
                {orderData.customer_id.phone_number}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Shop Details */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Shop Details:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography>
                <strong>Shop Name:</strong> {orderData.shopOwner_id.shop_name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Owner Name:</strong> {orderData.shopOwner_id.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Email:</strong> {orderData.shopOwner_id.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Contact No:</strong>{" "}
                {orderData.shopOwner_id.phone_number}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Address:</strong> {orderData.shopOwner_id.shop_address}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Services & Clothes Table */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Services & Clothes:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#ddd" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Service Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Cloth Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.request_id.clothes.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ backgroundColor: index % 2 ? "#f9f9f9" : "#fff" }}
                  >
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

          <Divider sx={{ my: 3 }} />
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Thank you for using Vastrashuddhi!
          </Typography>
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          Loading order details...
        </Typography>
      )}
    </Box>
  );
};

export default OrderDetails;
