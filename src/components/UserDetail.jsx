import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { updateUser, fetchUserLocations } from "../api/api";

export default function UserDetail({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);

  // Sync basic user info
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Fetch cities for current user (as simple strings)
  useEffect(() => {
    const loadCities = async () => {
      setLoadingCities(true);
      try {
        const citiesFromApi = await fetchUserLocations(); // returns string array
        setCities(citiesFromApi || []);
      } catch (err) {
        console.error("Failed to load cities:", err);
      } finally {
        setLoadingCities(false);
      }
    };
    loadCities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCity = () => {
    const trimmed = newCity.trim();
    if (trimmed && !cities.includes(trimmed)) {
      setCities([...cities, trimmed]);
      setNewCity("");
    }
  };

  const handleRemoveCity = (cityToRemove) => {
    setCities(cities.filter((c) => c !== cityToRemove));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        cities, // send array of strings
      };

      const updatedUser = await updateUser(payload);
      console.log("User updated:", updatedUser);

      if (onUpdate) onUpdate(updatedUser);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 4, bgcolor: "background.paper", borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Details
        </Typography>

        {/* Name & Email */}
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />


        {/* Cities */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Cities</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              label="Add City"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              fullWidth
            />
            <IconButton color="primary" onClick={handleAddCity}>
              <AddIcon />
            </IconButton>
          </Box>

          {loadingCities ? (
            <Typography sx={{ mt: 2 }}>Loading cities...</Typography>
          ) : (
            <List>
              {cities.map((city, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemoveCity(city)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={city} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Update User"}
        </Button>
      </Box>
    </Container>
  );
}
