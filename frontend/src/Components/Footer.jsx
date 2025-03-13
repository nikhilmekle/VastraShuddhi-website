import React, { useState } from "react";
import { Box, Container, Typography, Link, Grid, Dialog } from "@mui/material";
import LoginShop from "./pages/ShopOwner/LoginShop";
import AdminLogin from "./pages/Admin/AdminLogin";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shopOwnerLogin, setShopOwnerLogin] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setShopOwnerLogin(false);
    setDialogOpen(true);
  };

  const handleShopOwnerLogin = (e) => {
    e.preventDefault();
    setDialogOpen(true);
    setShopOwnerLogin(true);
  };

  const handleClose = () => setDialogOpen(false);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#2c5364",
          color: "#fff",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* About Section */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Vastrashuddhi
              </Typography>
              <Typography variant="body2">
                Bringing you the best laundry services in Pune. We ensure
                quality cleaning, easy scheduling, secure payments, and
                real-time order tracking.
              </Typography>
            </Grid>
            {/* Quick Links Section */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Link
                  href="#"
                  color="inherit"
                  underline="hover"
                  onClick={handleAdminLogin}
                >
                  Admin
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="hover"
                  onClick={handleShopOwnerLogin}
                >
                  Shop Owner
                </Link>
                <Link href="/partner" color="inherit" underline="hover">
                  Partner with Vastrashuddhi
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Vastrashuddhi. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm">
        {shopOwnerLogin ? (
          <LoginShop setDialogOpen={setDialogOpen} />
        ) : (
          <AdminLogin setDialogOpen={setDialogOpen} />
        )}
      </Dialog>
    </>
  );
};

export default Footer;
