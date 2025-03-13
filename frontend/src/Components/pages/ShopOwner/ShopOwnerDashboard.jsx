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
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentsIcon from "@mui/icons-material/Payments";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // 🚚 Pickup Requests Icon
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/ShopOwnerAuthProvider";
import toast from "react-hot-toast";

const drawerWidth = 300;

const ShopOwnerDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout Successfully");

    setTimeout(() => {
      localStorage.removeItem("shopAuth");
      sessionStorage.clear(); // Clear session storage
      navigate("/", { replace: true });
      // window.location.reload(); // Ensure complete logout effect
    }, 3000);
    setTimeout(() => {
      setAuth({ ...auth, shop: null, token: "" });
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
            {/* {auth.shop.shopName} */}Shop Owner Dashboard
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
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#1E88E5" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon sx={{ color: "#8E24AA" }} />
              </ListItemIcon>
              <ListItemText primary="My Store" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "#5C6BC0" }} />
              </ListItemIcon>
              <ListItemText primary="Pickup Requests" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "#43A047" }} />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <PaymentsIcon sx={{ color: "#FBC02D" }} />
              </ListItemIcon>
              <ListItemText primary="Payments Received" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptIcon sx={{ color: "#F57C00" }} />
              </ListItemIcon>
              <ListItemText primary="Invoices" />
            </ListItemButton>
          </ListItem>

          <ListItem>
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
        <Typography variant="h4">Welcome to Shop Owner Dashboard</Typography>
        <Typography variant="body1">
          Manage your store, orders, and payments efficiently.
        </Typography>
      </main>
    </div>
  );
};

export default ShopOwnerDashboard;
