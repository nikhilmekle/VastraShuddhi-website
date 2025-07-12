import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SupportIcon from "@mui/icons-material/Support";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

const drawerWidth = 300;

const CustomerDashboard = () => {
  const [open, setOpen] = useState(true);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const authData = JSON.parse(localStorage.getItem("auth"));

  // Determine the active menu from URL path
  const path = location.pathname.split("/").pop();
  const [activeMenu, setActiveMenu] = useState(path || "home");

  const handleLogout = () => {
    toast.success("Logout Successfully");
    setTimeout(() => {
      setAuth({ ...auth, customer: null, token: "" });
      localStorage.removeItem("auth");
      navigate("/");
    }, 3000);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Top App Bar */}
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
            {authData?.customer?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenu === "home"}
              onClick={() => {
                setActiveMenu("home");
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#FF5733" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenu === "requests"}
              onClick={() => {
                setActiveMenu("requests");
                navigate("/customer/dashboard/requests");
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#33B5E5" }} />
              </ListItemIcon>
              <ListItemText primary="My Request" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenu === "orders"}
              onClick={() => {
                setActiveMenu("orders");
                navigate("/customer/dashboard/orders");
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#33B5E5" }} />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenu === "payment"}
              onClick={() => {
                navigate("/customer/dashboard/payments");
                setActiveMenu("payment");
              }}
            >
              <ListItemIcon>
                <PaymentIcon sx={{ color: "#4CAF50" }} />
              </ListItemIcon>
              <ListItemText primary="Resent Payments" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenu === "notification"}
              onClick={() => {
                setActiveMenu("notification");
                navigate("notifications");
              }}
            >
              <ListItemIcon>
                <FeedbackIcon sx={{ color: "#FFC107" }} />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </ListItem>
          {/*}
          <ListItem disablePadding>
            <ListItemButton selected={activeMenu === "support"}>
              <ListItemIcon>
                <SupportIcon sx={{ color: "#9C27B0" }} />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={activeMenu === "profile"}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "#3F51B5" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#E91E63" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: 16 }}>
        <Toolbar />
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerDashboard;
