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
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);
      const data = response.data;

      if (data.token) {
        await login(data);
        navigate("/dashboard"); // ✅ redirect after login
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check your email and password.");
    } finally {
      setLoading(false);
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
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            name="email"
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>

        {/* 👇 Navigation to Register page */}
        <Typography align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
