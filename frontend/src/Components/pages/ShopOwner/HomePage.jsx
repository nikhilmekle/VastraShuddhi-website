import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Dummy data for testing
const dummyDashboardData = {
  totalRequests: 120,
  completedOrders: 85,
  pendingOrders: 35,
  totalEarnings: 56000,
  recentRequests: [
    {
      _id: "REQ1234",
      customerName: "Rahul Sharma",
      service_type: ["Dry Cleaning", "Pressing"],
      total_price: 500,
      status: "Completed",
      createdAt: "March 10, 2025, 10:30 AM",
    },
    {
      _id: "REQ5678",
      customerName: "Anita Verma",
      service_type: ["Washing"],
      total_price: 350,
      status: "Pending",
      createdAt: "March 11, 2025, 12:15 PM",
    },
    {
      _id: "REQ9101",
      customerName: "Rohit Mehta",
      service_type: ["Pressing"],
      total_price: 200,
      status: "Processing",
      createdAt: "March 11, 2025, 2:45 PM",
    },
  ],
};

const HomePage = () => {
  const [dashboardData] = useState(dummyDashboardData);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" align="center" sx={{ mb: 4 }}>
        Shop Owner Dashboard
      </Typography>

      {/* Dashboard Stats */}
      <Grid container spacing={3} justifyContent="center">
        {/* Total Requests */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <ReceiptIcon sx={{ fontSize: 40, color: "#1976D2", mr: 2 }} />
              <Box>
                <Typography variant="h6">Total Requests</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashboardData.totalRequests}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Orders */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AssignmentTurnedInIcon
                sx={{ fontSize: 40, color: "#2E7D32", mr: 2 }}
              />
              <Box>
                <Typography variant="h6">Completed Orders</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashboardData.completedOrders}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Orders */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <PendingActionsIcon
                sx={{ fontSize: 40, color: "#FFA000", mr: 2 }}
              />
              <Box>
                <Typography variant="h6">Pending Orders</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashboardData.pendingOrders}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Earnings */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <MonetizationOnIcon
                sx={{ fontSize: 40, color: "#E65100", mr: 2 }}
              />
              <Box>
                <Typography variant="h6">Total Earnings</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ₹{dashboardData.totalEarnings}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Latest Service Requests */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Recent Service Requests
        </Typography>
        <Grid container spacing={2}>
          {dashboardData.recentRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request._id}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">
                    Request #{request._id}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Customer:</strong> {request.customerName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Services:</strong> {request.service_type.join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total:</strong> ₹{request.total_price}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong>{" "}
                    <Chip
                      label={request.status}
                      color={
                        request.status === "Completed"
                          ? "success"
                          : request.status === "Pending"
                          ? "warning"
                          : "primary"
                      }
                      size="small"
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {request.createdAt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
