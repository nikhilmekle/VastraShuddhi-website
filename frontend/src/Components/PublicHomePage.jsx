import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PublicHomePage = ({ setDialogOpen, setIsLogin }) => {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        marginTop: 5,
        minHeight: "100vh",
        // Background with gradient overlay
        background: "linear-gradient(135deg, #FF7043, #FF8A65)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 8,
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          component={motion.div}
          variants={itemVariants}
          textAlign="center"
          mb={6}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Welcome to Vastrashuddhi
          </Typography>
          <Typography
            variant="h6"
            sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
          >
            Your One-Stop Solution for Laundry and Dry-Cleaning Services
          </Typography>
        </Box>

        {/* Features Section */}
        <Box
          component={motion.div}
          variants={itemVariants}
          mb={8}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "12px",
            p: 4,
            color: "#333",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            Key Features
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            mb={4}
            color="text.secondary"
          >
            Discover how Vastrashuddhi makes your laundry experience effortless.
          </Typography>

          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  textAlign: "center",
                  py: 3,
                  backgroundColor: "#e3f2fd",
                  boxShadow: 3,
                }}
              >
                <LocalLaundryServiceIcon
                  sx={{ fontSize: 50, color: "#1E88E5" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Quality Cleaning
                  </Typography>
                  <Typography variant="body2">
                    We ensure top-notch cleaning and care for your clothes.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  textAlign: "center",
                  py: 3,
                  backgroundColor: "#f3e5f5",
                  boxShadow: 3,
                }}
              >
                <CalendarMonthIcon sx={{ fontSize: 50, color: "#8e24aa" }} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Easy Scheduling
                  </Typography>
                  <Typography variant="body2">
                    Choose convenient pickup & delivery slots.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  textAlign: "center",
                  py: 3,
                  backgroundColor: "#fff9c4",
                  boxShadow: 3,
                }}
              >
                <PaymentIcon sx={{ fontSize: 50, color: "#fbc02d" }} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Secure Payments
                  </Typography>
                  <Typography variant="body2">
                    Pay online or opt for cash after service completion.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  textAlign: "center",
                  py: 3,
                  backgroundColor: "#e8f5e9",
                  boxShadow: 3,
                }}
              >
                <DoneAllIcon sx={{ fontSize: 50, color: "#43A047" }} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Real-Time Tracking
                  </Typography>
                  <Typography variant="body2">
                    Track your order status from pickup to delivery.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Steps Section */}
        <Box
          component={motion.div}
          variants={itemVariants}
          mb={8}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "12px",
            p: 4,
            color: "#333",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            How It Works
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            mb={4}
            color="text.secondary"
          >
            Getting your laundry done is as easy as these four steps.
          </Typography>

          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Box textAlign="center">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  1. Sign Up or Log In
                </Typography>
                <Typography variant="body2">
                  Create an account or log in to access our services.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Box textAlign="center">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  2. Schedule Pickup
                </Typography>
                <Typography variant="body2">
                  Choose a time & location for laundry pickup.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Box textAlign="center">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  3. We Clean
                </Typography>
                <Typography variant="body2">
                  Our experts handle your clothes with care.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Box textAlign="center">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  4. Delivery
                </Typography>
                <Typography variant="body2">
                  Receive fresh, clean clothes at your doorstep.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* About Vastrashuddhi / Know More Section */}
        <Box
          component={motion.div}
          variants={itemVariants}
          mb={8}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "12px",
            p: 4,
            color: "#333",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            About Vastrashuddhi
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            mb={4}
            sx={{ maxWidth: 700, mx: "auto" }}
            color="text.secondary"
          >
            Vastrashuddhi is dedicated to simplifying your laundry routine. With
            a network of top-rated laundry shops, secure payment options, and
            real-time tracking, we ensure a hassle-free experience. Our mission
            is to deliver convenience and quality at every step.
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2, fontWeight: "bold" }}
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                setDialogOpen(true);
                setIsLogin(false);
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PublicHomePage;
