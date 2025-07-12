import React, { useState, useEffect } from "react";
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
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const authData = JSON.parse(localStorage.getItem("shopAuth"));
  const token = authData?.token;

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v2/auth/shop/service-requests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setRequests(res.data.requests);
        const initialStatuses = res.data.requests.reduce((acc, request) => {
          acc[request._id] = request.status;
          return acc;
        }, {});
        setSelectedStatuses(initialStatuses);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch service requests.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]);

  if (!token) {
    toast.error("Authentication failed. Please log in again.");
  }

  const handleSelectChange = (id, newStatus) => {
    setSelectedStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleUpdateStatus = async (id) => {
    const newStatus = selectedStatuses[id];
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/v2/auth/shop/service-request/${id}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Status updated successfully!");
        fetchRequests();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  const handleDialogOpen = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" align="center" sx={{ mb: 3 }}>
        Received Service Requests
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2196f3" }}>
              {[
                "Request ID",
                "Customer Name",
                "Services",
                "Cloths",
                "Status",
                "Actions",
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
                  {request.customer_id.name}
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
                  <Select
                    value={selectedStatuses[request._id] || "Pending"}
                    onChange={(e) =>
                      handleSelectChange(request._id, e.target.value)
                    }
                    size="small"
                    sx={{
                      minWidth: 120,
                      borderRadius: "8px",
                      fontWeight: "bold",
                      backgroundColor: "white",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Accepted">Accepted</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateStatus(request._id)}
                    sx={{
                      borderRadius: "8px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for detailed view */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: "#2196f3",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Service Request Details
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          {selectedRequest && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Request ID: {selectedRequest._id}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Customer Name:</strong>{" "}
                {selectedRequest.customer_id.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {selectedRequest.customer_id.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Phone:</strong>{" "}
                {selectedRequest.customer_id.phone_number}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Address:</strong> {selectedRequest.customer_id.address}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Service Types:</strong>{" "}
                {selectedRequest.service_type.join(", ")}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Clothes:</strong>
                {selectedRequest.clothes.map((cloth, idx) => (
                  <span key={idx}>
                    {cloth.type}
                    {idx < selectedRequest.clothes.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Status:</strong> {selectedRequest.status}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRequest.createdAt).toLocaleString()}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedRequest.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="outlined"
            sx={{ width: "100%" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RequestPage;
