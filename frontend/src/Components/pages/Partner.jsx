import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Dialog,
} from "@mui/material";
import img from "../../assets/heroimg1.jpeg";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Navbar from "../Navbar";
import RegisterShop from "./ShopOwner/RegisterShop";

const Partner = ({ setDialogOpen, setIsLogin }) => {
  const [open, setOpen] = useState(false);

  const handleRegisterShop = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "80vh",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Navbar />
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(16, 16, 16, 0.5)",
            }}
          />

          <Container
            sx={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
              px: 3,
            }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
              Partner with VastraShuddhi and grow your business
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 3,
                py: 1.5,
                fontSize: "18px",
                borderRadius: "10px",
                textTransform: "none",
              }}
              onClick={handleRegisterShop}
            >
              Register Your Shop
            </Button>
          </Container>
        </Box>

        {/* Why Partner Section */}
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Why should you partner with Vastrashuddhi?
          </Typography>
          <Box
            sx={{
              width: "100px",
              height: "4px",
              backgroundColor: "#000",
              mx: "auto",
            }}
          />
        </Box>

        <Container sx={{ mb: 5 }}>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <PeopleIcon fontSize="large" color="primary" />,
                title: "Increased Customer Reach",
                description:
                  "Get discovered by local customers looking for reliable laundry services.",
              },
              {
                icon: <MonetizationOnIcon fontSize="large" color="success" />,
                title: "Boost Your Revenue",
                description:
                  "Expand your business with increased online visibility and customer engagement.",
              },
              {
                icon: (
                  <AssignmentTurnedInIcon fontSize="large" color="secondary" />
                ),
                title: "Seamless Order Management",
                description:
                  "Manage and track your laundry orders efficiently through our platform.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>{feature.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <RegisterShop setOpen={setOpen} />
      </Dialog>
    </>
  );
};

export default Partner;
