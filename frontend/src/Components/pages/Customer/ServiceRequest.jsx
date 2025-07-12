import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Checkbox,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const clothTypes = ["Shirt", "Pants", "Jacket", "Saree", "Others"];

const ServiceRequest = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [clothes, setClothes] = useState([{ type: "", quantity: 1 }]);
  const navigate = useNavigate();

  //shop details get from nearby shops component
  const location = useLocation();
  const shopDetails = location.state?.shop || {};

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v2/auth/services"
        );
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceToggle = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleAddCloth = () => {
    setClothes([...clothes, { type: "", quantity: 1 }]);
  };

  const handleRemoveCloth = (index) => {
    if (clothes.length > 1) {
      setClothes(clothes.filter((_, i) => i !== index));
    }
  };

  const handleClothChange = (index, field, value) => {
    const updatedClothes = [...clothes];
    // Convert quantity to a number to prevent string concatenation
    updatedClothes[index][field] = field === "quantity" ? Number(value) : value;
    setClothes(updatedClothes);
  };

  const total_amount = useMemo(() => {
    return selectedServices.reduce((total, serviceName) => {
      const service = services.find((s) => s.service_name === serviceName);
      if (!service) return total;

      // Correct way to calculate total price
      return (
        total +
        clothes.reduce((sum, item) => sum + service.price * item.quantity, 0)
      );
    }, 0);
  }, [selectedServices, clothes, services]);

  const total_quantity = useMemo(() => {
    return clothes.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }, [clothes]);

  const authData = JSON.parse(localStorage.getItem("auth")); // Parse JSON string to object
  const token = authData?.token; // Extract token safely
  console.log(`token from service request ${token}`);

  if (!token) {
    toast.error("Authentication failed. Please log in again.");
    return;
  }
  const requestData = {
    shopOwner_id: shopDetails._id,
    service_type: selectedServices,
    clothes,
    total_quantity,
    total_amount,
  };
  // console.log(requestData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/customer/dashboard/requests");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v2/auth/customer/service-request",
        requestData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct format
            Authorization: token, // Send token in headers
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Box sx={{ p: 4, mt: 8, maxWidth: 800, mx: "auto" }}>
      {/* Shop Details */}
      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 8,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          color: "white",
          transition: "0.3s",
          "&:hover": {
            boxShadow: 12,
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: "1.8rem",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            {shopDetails.shop_name}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              fontSize: "1.2rem",
              textAlign: "center",
              color: "#FFF",
              opacity: 0.9,
              mt: 1,
            }}
          >
            {shopDetails.name}
          </Typography>

          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "white",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              <LocationOnIcon sx={{ color: "yellow", mr: 1 }} />
              {shopDetails.shop_address}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <StarIcon sx={{ color: "gold", mr: 1, fontSize: "1.5rem" }} />
              {shopDetails.rating
                ? `${shopDetails.rating} / 5`
                : "No ratings yet"}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Select Service Type */}
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Select Services
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={6} key={service._id}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "8px",
                boxShadow: selectedServices.includes(service.service_name)
                  ? 5
                  : 1,
                backgroundColor: selectedServices.includes(service.service_name)
                  ? "#e3f2fd"
                  : "white",
                cursor: "pointer",
              }}
              onClick={() => handleServiceToggle(service.service_name)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalLaundryServiceIcon />
                <Typography sx={{ ml: 1 }} fontWeight="bold">
                  {service.service_name} - ₹{service.price}/cloth
                </Typography>
              </Box>
              <Checkbox
                checked={selectedServices.includes(service.service_name)}
                onChange={() => handleServiceToggle(service.service_name)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Clothes */}
      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
        Add Clothes
      </Typography>
      {clothes.map((cloth, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              value={cloth.type}
              onChange={(e) => handleClothChange(index, "type", e.target.value)}
              variant="outlined"
              label="Cloth Type"
            >
              {clothTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={cloth.quantity}
              onChange={(e) =>
                handleClothChange(index, "quantity", e.target.value)
              }
              inputProps={{ min: 1 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => handleRemoveCloth(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        onClick={handleAddCloth}
        startIcon={<AddIcon />}
        sx={{ mt: 1, mb: 3 }}
      >
        Add More Clothes
      </Button>

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Total Quantity:{total_quantity}
      </Typography>

      {/* Total Price */}
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Total Price: ₹{total_amount}
      </Typography>

      {/* Submit Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={
            selectedServices.length === 0 || clothes.some((c) => !c.type)
          }
          sx={{
            fontWeight: "bold",
            p: 1.5,
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#0056b3",
            },
          }}
        >
          Send Service Request
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceRequest;
