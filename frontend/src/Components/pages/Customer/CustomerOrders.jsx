import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Dialog,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order
  // console.log(selectedOrder ? selectedOrder._id : "no order selected");
  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Store order details

    setDialogOpen(true);
    // console.log("Selected Order:", selectedOrder);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData?.token;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v2/auth/customer/orders",
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
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Box sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          My Orders
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : orders.length === 0 ? (
          <Typography variant="h6" align="center">
            No orders found.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 2, borderRadius: 2, overflowX: "auto" }}
          >
            <Table sx={{ minWidth: 600, border: "1px solid #ddd" }}>
              {/* Table Head */}
              <TableHead sx={{ backgroundColor: "#B0BEC5" }}>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "1px solid #ddd" }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "1px solid #ddd" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "1px solid #ddd" }}
                  >
                    Total Amount
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "1px solid #ddd" }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "action.hover" : "white",
                      cursor: "pointer", // Add pointer cursor for click effect
                    }}
                    onClick={() => handleOrderClick(order)} // Click on row to open dialog
                  >
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {order._id}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {order.order_status}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      ₹{order.total_amount}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {new Date(order.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Dialog with Order Details */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="lg" // Try 'md', 'lg', or 'xl' for more width
        sx={{ "& .MuiDialog-paper": { width: "90%", maxWidth: "1000px" } }} // Custom width
      >
        {selectedOrder && <OrderDetails orderId={selectedOrder._id} />}
      </Dialog>
    </>
  );
};

export default CustomerOrders;
