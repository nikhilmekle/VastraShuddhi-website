import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AdminAuthProvider";

const AdminLogin = ({ setDialogOpen }) => {
  const [adminAuth, setAdminAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v2/auth/admin/login",
        { email, password }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        setDialogOpen(false);

        // Save authentication data
        setAdminAuth({
          admin: res.data.admin, // Ensure key matches API response
          token: res.data.token,
        });

        localStorage.setItem("adminAuth", JSON.stringify(res.data));

        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      } else {
        toast.error(res?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong while logging in. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #141E30, #243B55)",
        padding: 2,
      }}
    >
      <Container sx={{ width: "80%" }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#0066ff",
              textTransform: "uppercase",
            }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#555", mb: 3 }}
          >
            Secure access to the admin panel
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                p: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0066ff, #0033cc)",
                color: "#fff",
                borderRadius: 3,
                "&:hover": {
                  background: "linear-gradient(90deg, #0033cc, #0066ff)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
