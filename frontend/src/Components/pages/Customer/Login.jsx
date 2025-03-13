import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth"; // Use the global auth context

const Login = ({ setDialogOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Remove local auth state and use the context instead
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v2/auth/customer/login",
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setDialogOpen(false);
        // Wait 3 seconds before updating auth state, closing the dialog, and navigating.
        setTimeout(() => {
          setAuth({
            customer: res.data.customer,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #2196F3, #21CBF3)",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        width: { xs: "90%", sm: "400px" },
        textAlign: "center",
        mx: "auto",
        mt: 5,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          marginBottom: "20px",
        }}
      >
        🔑 Welcome Back!
      </Typography>
      <TextField
        fullWidth
        placeholder="Email address"
        variant="outlined"
        sx={{
          marginBottom: 2,
          backgroundColor: "white",
          borderRadius: "8px",
          "& fieldset": { borderColor: "#90caf9" },
          "&:hover fieldset": { borderColor: "#1976D2" },
          "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
        }}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        fullWidth
        placeholder="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        sx={{
          marginBottom: 2,
          backgroundColor: "white",
          borderRadius: "8px",
          "& fieldset": { borderColor: "#90caf9" },
          "&:hover fieldset": { borderColor: "#1976D2" },
          "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
        }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          color: "#fff",
          marginBottom: 2,
          cursor: "pointer",
          "&:hover": { color: "#90caf9", textDecoration: "underline" },
        }}
      >
        Forgot password?
      </Typography>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{
          background: "linear-gradient(45deg, #FF6F61, #FF8E53)",
          color: "white",
          fontSize: "1rem",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "8px",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(45deg, #FF8E53, #FF6F61)",
            boxShadow: "0 0 15px #FF8E53",
          },
        }}
      >
        🚀 Login
      </Button>
    </Box>
  );
};

export default Login;
