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
import RequestPage from "./RequestPage";
import Orders from "../ShopOwner/Orders";
import ShopDetails from "./ShopDetails";
import Payments from "./Payments";
import Notifications from "../Notifications";

const drawerWidth = 300;

const ShopOwnerDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("shopAuth"));

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
            {authData?.shop.shopName}
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
            <ListItemButton
              selected={activeMenu === "My Shop"}
              onClick={() => {
                setActiveMenu("My Shop");
              }}
            >
              <ListItemIcon>
                <StorefrontIcon sx={{ color: "#8E24AA" }} />
              </ListItemIcon>
              <ListItemText primary="My Shop" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={activeMenu === "requests"} // change the background of seelected option
              onClick={() => {
                setActiveMenu("requests");
              }}
            >
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "#5C6BC0" }} />
              </ListItemIcon>
              <ListItemText primary="Received Requests" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={activeMenu === "Orders"}
              onClick={() => {
                setActiveMenu("Orders");
              }}
            >
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "#43A047" }} />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={activeMenu === "Payment"}
              onClick={() => {
                setActiveMenu("Payment");
              }}
            >
              <ListItemIcon>
                <PaymentsIcon sx={{ color: "#FBC02D" }} />
              </ListItemIcon>
              <ListItemText primary="Payments " />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={activeMenu === "notification"}
              onClick={() => {
                setActiveMenu("notification");
              }}
            >
              <ListItemIcon>
                <ReceiptIcon sx={{ color: "#F57C00" }} />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
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
      <main style={{ flexGrow: 1 }}>
        <Toolbar />
        {activeMenu === "requests" && <RequestPage />}
        {activeMenu === "Orders" && <Orders />}
        {activeMenu === "My Shop" && <ShopDetails />}
        {activeMenu === "Payment" && <Payments />}
        {activeMenu === "notification" && <Notifications type="ShopOwner" />}
        {/* {activeMenu === "orders" && } */}
        {activeMenu === "home" && (
          <Typography variant="h6" align="center">
            Welcome to your Dashboard. Please select an option from the menu.
          </Typography>
        )}
      </main>
    </div>
  );
};

export default ShopOwnerDashboard;
