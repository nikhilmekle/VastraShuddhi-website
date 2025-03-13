import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import PaymentIcon from "@mui/icons-material/Payment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { motion } from "framer-motion";

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, when: "beforeChildren", duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        background: "linear-gradient(135deg, #FF7043, #FF8A65)",
      }}
    >
      {/* Hero Section */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          backgroundImage:
            'url("https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          color: "white",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            About Vastrashuddhi
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "800px",
              margin: "auto",
              marginTop: "10px",
              textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            Vastrashuddhi is an online platform that connects users with nearby
            laundry services, allowing seamless order placement, pickup
            scheduling, and online payments.
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container
        sx={{
          marginTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <Box component={motion.div} variants={itemVariants}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color="#fff"
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ maxWidth: "800px", margin: "auto" }}
          >
            We aim to provide a hassle-free and convenient laundry experience by
            bridging the gap between customers and professional laundry service
            providers.
          </Typography>
        </Box>

        {/* Key Features Section */}
        <Grid
          container
          spacing={3}
          sx={{ marginTop: "40px" }}
          component={motion.div}
          variants={itemVariants}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              variants={itemVariants}
              sx={{
                textAlign: "center",
                padding: "20px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <LocalLaundryServiceIcon
                sx={{ fontSize: 50, color: "#1E88E5" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Quality Cleaning
                </Typography>
                <Typography variant="body2">
                  Professional cleaning with high-quality service.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              variants={itemVariants}
              sx={{
                textAlign: "center",
                padding: "20px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <ScheduleIcon sx={{ fontSize: 50, color: "#43A047" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Easy Scheduling
                </Typography>
                <Typography variant="body2">
                  Choose pickup & delivery times at your convenience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              variants={itemVariants}
              sx={{
                textAlign: "center",
                padding: "20px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <PaymentIcon sx={{ fontSize: 50, color: "#FBC02D" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Online Payment
                </Typography>
                <Typography variant="body2">
                  Pay securely through multiple online payment options.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              variants={itemVariants}
              sx={{
                textAlign: "center",
                padding: "20px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <SupportAgentIcon sx={{ fontSize: 50, color: "#E53935" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  24/7 Support
                </Typography>
                <Typography variant="body2">
                  Dedicated customer support for your queries.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
