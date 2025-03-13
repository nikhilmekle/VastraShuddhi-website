import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterShop = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    address: "",
    shopName: "",
    shopImage: null,
    latitude: "", // <-- Added Latitude
    longitude: "", // <-- Added Longitude
  });

  const [errors, setErrors] = useState({});

  // Regular Expressions for Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Owner Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Enter a valid 10-digit phone number";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.shopName.trim()) newErrors.shopName = "Shop Name is required";
    if (!formData.latitude.trim()) newErrors.latitude = "Latitude is required";
    if (!formData.longitude.trim())
      newErrors.longitude = "Longitude is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const shopData = {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
          shop_address: formData.address,
          shop_name: formData.shopName, // ✅ Change from `shopName` to `shop_name`
          shop_location: {
            type: "Point",
            coordinates: [
              parseFloat(formData.longitude), // Longitude First
              parseFloat(formData.latitude), // Latitude Second
            ],
          },
        };

        console.log("Sending Data to Backend:", shopData); // 🛠️ Debugging Log

        const res = await axios.post(
          "http://localhost:8080/api/v2/auth/shop/register",
          shopData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setOpen(false);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error response:", error.response?.data); // 🛠️ Debugging Log
        toast.error("Registration failed. Please check your inputs.");
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 3,
        boxShadow: 5,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          🏪 Register Your Shop
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Owner Name & Email */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                name="name"
                label="Owner Name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            {/* Phone Number & Password */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                value={formData.phone_number}
                onChange={handleChange}
                error={!!errors.phone_number}
                helperText={errors.phone_number}
              />
              <TextField
                fullWidth
                name="password"
                label="Create Password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>

            {/* Shop Name & Address */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                name="shopName"
                label="Shop Name"
                variant="outlined"
                value={formData.shopName}
                onChange={handleChange}
                error={!!errors.shopName}
                helperText={errors.shopName}
              />
              <TextField
                fullWidth
                name="address"
                label="Shop Address"
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Box>

            {/* Latitude & Longitude */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                name="latitude"
                label="Latitude"
                type="number"
                variant="outlined"
                value={formData.latitude}
                onChange={handleChange}
                error={!!errors.latitude}
                helperText={errors.latitude}
              />
              <TextField
                fullWidth
                name="longitude"
                label="Longitude"
                type="number"
                variant="outlined"
                value={formData.longitude}
                onChange={handleChange}
                error={!!errors.longitude}
                helperText={errors.longitude}
              />
            </Box>

            {/* Register Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                p: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#1565C0" },
              }}
            >
              Register Shop 🚀
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterShop;
