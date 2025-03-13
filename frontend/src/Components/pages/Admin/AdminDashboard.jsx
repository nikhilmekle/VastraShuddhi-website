import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import StoreIcon from "@mui/icons-material/Store";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import RefundIcon from "@mui/icons-material/Replay";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AdminAuthProvider";
import toast from "react-hot-toast";

const drawerWidth = 300;

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show logout success toast immediately
    toast.success("Logout Successfully");

    // Wait 5 seconds before updating the auth state and navigating away
    setTimeout(() => {
      localStorage.removeItem("adminAuth");
      sessionStorage.clear(); // Clear session storage
      navigate("/", { replace: true });
      // window.location.reload(); // Ensure complete logout effect
    }, 3000);
    setTimeout(() => {
      setAuth({ ...auth, admin: null, token: "" }); // update auth after delay
    }, 5000);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {auth.admin.name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Side Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#1E88E5" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/orders")}>
              <ListItemIcon>
                <PaymentIcon sx={{ color: "#43A047" }} />
              </ListItemIcon>
              <ListItemText primary="Customer Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/payments")}>
              <ListItemIcon>
                <MoneyIcon sx={{ color: "#FBC02D" }} />
              </ListItemIcon>
              <ListItemText primary="Payment Requests" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/payouts")}>
              <ListItemIcon>
                <StoreIcon sx={{ color: "#8E24AA" }} />
              </ListItemIcon>
              <ListItemText primary="Payouts to Shop Owners" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/earnings")}>
              <ListItemIcon>
                <MoneyIcon sx={{ color: "#F57C00" }} />
              </ListItemIcon>
              <ListItemText primary="Platform Earnings" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/shop-owners")}>
              <ListItemIcon>
                <StoreIcon sx={{ color: "#00ACC1" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Shop Owners" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/refunds")}>
              <ListItemIcon>
                <RefundIcon sx={{ color: "#D32F2F" }} />
              </ListItemIcon>
              <ListItemText primary="Refunds & Disputes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/reports")}>
              <ListItemIcon>
                <ReportIcon sx={{ color: "#388E3C" }} />
              </ListItemIcon>
              <ListItemText primary="Analytics & Reports" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/settings")}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "#5C6BC0" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#E53935" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <main
        style={{
          flexGrow: 1,
          padding: "20px",
          marginLeft: open ? drawerWidth : 0,
        }}
      >
        <Toolbar />
        <Typography variant="h4">Welcome to Admin Dashboard</Typography>
        <Typography variant="body1">
          Manage payments, transactions, and shop owners efficiently.
        </Typography>
      </main>
    </div>
  );
};

export default AdminDashboard;
