import React, { useState, useEffect } from "react";
import img from "../../../assets/heroimg.jpeg"; // Ensure the path is correct
import {
  Typography,
  Button,
  Container,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SelectService from "./SelectService";
import NearbyShops from "./NearbyShops";

const Home = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [fetchShops, setFetchShops] = useState(false); // State to trigger shop fetching

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          // Reverse geocode using OpenStreetMap's Nominatim API
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const { address } = data;
              const placeName =
                address.city ||
                address.town ||
                address.village ||
                address.county ||
                "Location not available";
              setLocation(placeName);
            })
            .catch((error) => {
              console.error("Error reverse geocoding:", error);
              setLocation("Location not available");
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Location not available");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const handleSearch = () => {
    setFetchShops((prev) => !prev); // Toggle state to trigger fetching in NearbyShops
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "70vh",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1E3A4F",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(80, 70, 70, 0.5)",
          }}
        />

        {/* Hero Content */}
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
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Discover the Best Dry Cleaning Services in {location}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Find top-rated laundry and dry-cleaning shops near you.
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 7,
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              padding: "10px",
              width: "50%",
              maxWidth: "800px",
            }}
          >
            <TextField
              placeholder="Enter location"
              variant="outlined"
              fullWidth
              value={location}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="error" />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 2 }}
            />

            <Button
              variant="contained"
              sx={{ borderRadius: "10px", px: 4, flex: 1 }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Nearby Shops Section */}
      <Container sx={{ mt: 4 }}>
        <NearbyShops
          latitude={latitude}
          longitude={longitude}
          fetchShops={fetchShops} // Pass fetchShops as prop
        />
      </Container>
    </>
  );
};

export default Home;
