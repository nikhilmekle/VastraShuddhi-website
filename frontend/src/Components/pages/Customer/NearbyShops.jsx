import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

const NearbyShops = ({ latitude, longitude, fetchShops }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchShops && latitude && longitude) {
      const fetchNearbyShops = async () => {
        setLoading(true);
        setError(null);

        try {
          const { data } = await axios.get(
            "http://localhost:8080/api/v2/auth/customer/nearby-shops",
            {
              params: { latitude, longitude },
            }
          );

          console.log("API Response:", data);
          setShops(data.nearbyShops || []);
        } catch (error) {
          console.error("API Error:", error);
          setError(error.response?.data?.message || "Failed to fetch shops");
        }

        // Ensure loading spinner is visible for at least 2-3 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000); // 2-second delay
      };

      fetchNearbyShops();
    }
  }, [fetchShops, latitude, longitude]);

  return (
    <Box sx={{ flexGrow: 1, p: 3, mb: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", mb: 5 }}
      >
        Nearby Laundry Shops
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography sx={{ textAlign: "center", color: "red" }}>
          {error}
        </Typography>
      ) : shops.length > 0 ? (
        <Grid container spacing={3}>
          {shops.map((shop) => (
            <Grid item xs={12} sm={6} md={4} key={shop.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: "15px",
                  boxShadow: 5,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Card Media with Overlay */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      shop.image ||
                      "https://as2.ftcdn.net/v2/jpg/04/72/14/03/1000_F_472140381_Ni9z8EV1zzUzp376F5VzJDNBEAl9uFYR.jpg"
                    }
                    alt={shop.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "40%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    }}
                  />
                </Box>

                {/* Card Content */}
                <CardContent sx={{ backgroundColor: "#f9f9f9", padding: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#333" }}
                  >
                    {shop.shop_name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#666", mb: 1 }}>
                    {shop.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#555",
                    }}
                  >
                    <LocationOnIcon sx={{ color: "red", mr: 0.5 }} />
                    {shop.shop_address}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#FFA500",
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    <StarIcon sx={{ color: "#FFA500", mr: 0.5 }} />
                    {shop.rating ? `${shop.rating} / 5` : "No ratings yet"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          No nearby shops found.
        </Typography>
      )}
    </Box>
  );
};

export default NearbyShops;
