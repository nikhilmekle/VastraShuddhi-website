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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
const drawerWidth = 300;

const CustomerDashboard = () => {
  const [open, setOpen] = useState(true);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Show logout success toast immediately
    toast.success("Logout Successfully");

    // Wait 5 seconds before updating the auth state and navigating away
    setTimeout(() => {
      setAuth({ ...auth, customer: null, token: "" }); // update auth after delay
      localStorage.removeItem("auth");
      navigate("/");
    }, 3000);
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
            Customer Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Side Drawer */}
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
                <HomeIcon sx={{ color: "#FF5733" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#33B5E5" }} />
              </ListItemIcon>
              <ListItemText primary="My Request" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#33B5E5" }} />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <PaymentIcon sx={{ color: "#4CAF50" }} />
              </ListItemIcon>
              <ListItemText primary="Payment History" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <FeedbackIcon sx={{ color: "#FFC107" }} />
              </ListItemIcon>
              <ListItemText primary="Feedback & Reviews" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SupportIcon sx={{ color: "#9C27B0" }} />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "#3F51B5" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem>
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
      <main
        style={{
          flexGrow: 1,
          padding: "20px",
          marginLeft: open ? drawerWidth : 0,
        }}
      >
        <Toolbar />
        <Typography variant="h4">Welcome to Customer Dashboard</Typography>
        <Typography variant="body1">
          Manage your orders, payments, and profile here.
        </Typography>
      </main>
    </div>
  );
};

export default CustomerDashboard;
