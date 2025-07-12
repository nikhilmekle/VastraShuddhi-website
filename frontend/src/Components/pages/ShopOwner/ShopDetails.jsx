import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";

const ShopDetails = () => {
  const [shop, setShop] = useState({
    owner_name: "",
    shop_name: "",
    email: "",
    phone_number: "",
    shop_address: "",
  });

  const authData = JSON.parse(localStorage.getItem("shopAuth"));
  const token = authData?.token;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v2/auth/shop/details",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setShop(res.data.shop);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(`Error in fetching shop data: ${error}`);
      toast.error("Failed to fetch shop data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    toast.success("Shop details updated successfully!");
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    input: { color: "white" },
    label: { color: "white" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: "900px",
          p: 4,
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
          color: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
          >
            Shop Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="owner_name"
                label="Owner Name"
                value={shop.owner_name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="shop_name"
                label="Shop Name"
                value={shop.shop_name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                value={shop.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone_number"
                label="Phone Number"
                value={shop.phone_number}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="shop_address"
                label="Address"
                value={shop.shop_address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdate}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
              px: 4,
              py: 1.5,
            }}
          >
            Update Shop
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ShopDetails;
