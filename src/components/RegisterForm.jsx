import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cities: [formData.location], // backend expects array
      };

      const response = await axios.post("http://localhost:8080/auth/register", payload);

      console.log("User registered:", response.data);

      // Assuming backend returns { success: true, user: {...}, token: "..." }
      const data = response.data;

      setLoading(false);

      if (onRegister) onRegister(data.user || data); // pass back user object
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration failed", err);
      setLoading(false);
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="City"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
