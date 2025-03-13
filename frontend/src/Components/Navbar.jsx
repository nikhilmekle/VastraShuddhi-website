import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Dialog,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Customer/Login";
import Register from "./pages/Customer/Register";
import { useAuth } from "../context/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import toast from "react-hot-toast";

// UserMenu Component
const UserMenu = ({ auth, setAuth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

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
    <div onMouseLeave={handleMouseLeave}>
      <Button
        sx={{
          color: "#fff",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
        onMouseEnter={handleMouseEnter}
      >
        <AccountCircleIcon sx={{ paddingRight: 1 }} />
        {auth?.customer?.name}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        MenuListProps={{ onMouseLeave: handleMouseLeave }}
        PaperProps={{
          sx: {
            backgroundColor: "#222",
            color: "#fff",
            mt: 1,
          },
        }}
      >
        <MenuItem onClick={() => console.log("Profile clicked")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/customer/dashboard")}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

// Navbar Component
const Navbar = ({ dialogOpen, setDialogOpen, isLogin, setIsLogin }) => {
  const [auth, setAuth] = useAuth();
  // const [open, setOpen] = useState(false);
  // const [isLogin, setIsLogin] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenLogin = () => {
    setIsLogin(true);
    setDialogOpen(true);
  };

  const handleOpenRegister = () => {
    setIsLogin(false);
    setDialogOpen(true);
  };

  const handleClose = () => setDialogOpen(false);
  const toggleDrawer = (dialogOpen) => () => setDrawerOpen(dialogOpen);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
          padding: "5px 0",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontStyle: "italic",
              minWidth: "150px",
            }}
          >
            Vastrashuddhi
          </Typography>

          {/* Navigation */}
          {isMobile ? (
            <>
              <IconButton onClick={toggleDrawer(true)} sx={{ color: "#fff" }}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    backgroundColor: "#2c5364",
                    height: "100vh",
                    color: "#fff",
                  }}
                >
                  <IconButton
                    onClick={toggleDrawer(false)}
                    sx={{ display: "block", ml: "auto", color: "#fff" }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate("/");
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate("/about");
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemText primary="About" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          handleOpenLogin();
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemText primary="Log In" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          handleOpenRegister();
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemText primary="Sign Up" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => navigate("/about")}
              >
                About
              </Button>

              {!auth.customer ? (
                <>
                  <Button
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    onClick={handleOpenLogin}
                  >
                    Log In
                  </Button>
                  <Button
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    onClick={handleOpenRegister}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <UserMenu auth={auth} setAuth={setAuth} />
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Dialog for Login/Register */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm">
        {isLogin ? (
          <Login setDialogOpen={setDialogOpen} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </Dialog>
    </>
  );
};

export default Navbar;
