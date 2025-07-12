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
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import toast from "react-hot-toast";

// Format timestamp to IST
const formatDateToIST = (timestamp) => {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MyServiceRequests = () => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData?.token;
  const [requests, setRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v2/auth/customer/service-requests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setRequests(res.data.requests || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch service requests.");
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  if (!token) {
    toast.error("Authentication failed. Please log in again.");
    return <Typography align="center">Authentication required.</Typography>;
  }

  const handleCancelRequest = async (requestId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v2/auth/customer/service-request/${requestId}`,
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
        fetchRequests();
        setOpenDialog(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error canceling request:", error);
      toast.error("Failed to cancel service request.");
    }
  };

  const handleDialogOpen = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  // const handleDialogClose = () => {
  //   setOpenDialog(false);
  //   setSelectedRequest(null);
  // };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" align="center" sx={{ mb: 4 }}>
        My Service Requests
      </Typography>

      {requests.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 3 }}
        >
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2196f3" }}>
                {[
                  "Request ID",
                  "Shop Name",
                  "Services",
                  "Cloths",
                  "Status",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      borderBottom: "2px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request._id}
                  sx={{
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => handleDialogOpen(request)}
                >
                  <TableCell
                    sx={{ textAlign: "center", borderRight: "1px solid #ddd" }}
                  >
                    {request._id}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", borderRight: "1px solid #ddd" }}
                  >
                    {request.shopOwner_id.name}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", borderRight: "1px solid #ddd" }}
                  >
                    {request.service_type.join(", ")}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", borderRight: "1px solid #ddd" }}
                  >
                    {request.clothes.map((cloth, idx) => (
                      <span key={idx}>
                        {cloth.type} ({cloth.quantity})
                        {idx < request.clothes.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "center", borderRight: "1px solid #ddd" }}
                  >
                    {request.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center">
          No service requests found.
        </Typography>
      )}

      {/* Dialog for full request details */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Request Details
          <IconButton onClick={() => setOpenDialog(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedRequest && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Request ID:{" "}
                <Typography component="span" color="text.secondary">
                  {selectedRequest._id}
                </Typography>
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Shop Name:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRequest.shopOwner_id.shop_name}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Owner:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRequest.shopOwner_id.name}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Contact:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRequest.shopOwner_id.phone_number}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Address:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRequest.shopOwner_id.shop_address}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Services:
                </Typography>
                <Typography variant="body1">
                  {selectedRequest.service_type.join(", ")}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Clothes:
                </Typography>
                <Typography variant="body1">
                  {selectedRequest.clothes.map((c) => `${c.type} `).join(", ")}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Total Quantity:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRequest.total_quantity}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Total Amount:
                  </Typography>
                  <Typography variant="body1">
                    ₹{selectedRequest.total_amount}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Status:
                </Typography>
                <Chip
                  label={selectedRequest.status}
                  color={
                    selectedRequest.status === "Accepted"
                      ? "success"
                      : selectedRequest.status === "Pending"
                      ? "warning"
                      : selectedRequest.status === "Cancelled"
                      ? "default"
                      : "error"
                  }
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Requested On:
                </Typography>
                <Typography variant="body1">
                  {formatDateToIST(selectedRequest.createdAt)}
                </Typography>
              </Box>

              {selectedRequest.status === "Pending" && (
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelRequest(selectedRequest._id)}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Cancel Request
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyServiceRequests;
