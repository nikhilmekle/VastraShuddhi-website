import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";

const Notifications = ({ type }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // To handle errors
  const [loading, setLoading] = useState(true); // To show loading state

  const token =
    type === "Customer"
      ? JSON.parse(localStorage.getItem("auth"))?.token
      : JSON.parse(localStorage.getItem("shopAuth"))?.token;

  useEffect(() => {
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v2/notifications/all/${type.toLowerCase()}`,
          {
            headers: { Authorization: token },
          }
        );

        if (res.data.success) {
          setNotifications(res.data.data); // Changed from res.data.notifications to res.data.data
        } else {
          setError("Failed to load notifications");
        }
      } catch (err) {
        console.error("Error loading notifications:", err);
        setError("Error loading notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [type, token]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <Paper elevation={2}>
        <List>
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <React.Fragment key={note._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={note.message}
                    secondary={new Date(note.createdAt).toLocaleString()}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No notifications yet." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications;
