import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Your backend URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch weather summary for a city
export const fetchWeatherSummary = async (city) => {
  try {
    const response = await api.get(`/weather/summary?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (err) {
    console.error(`Failed to fetch weather for ${city}:`, err);
    throw err;
  }
};

// Fetch full weather details by city ID
export const fetchWeatherDetail = async (cityId) => {
  try {
    const response = await api.get(`/weather/detail/${cityId}`);
    return response.data;
  } catch (err) {
    console.error(`Failed to fetch weather detail for cityId ${cityId}:`, err);
    throw err;
  }
};

// Fetch user details by email
export const fetchUserByEmail = async (email) => {
  try {
    const response = await api.get(`/auth/user?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (err) {
    console.error(`Failed to fetch user for email ${email}:`, err);
    throw err;
  }
};

// Fetch locations for current user
export const fetchUserLocations = async () => {
  try {
    const response = await api.get("/users/locations");
    return response.data || []; // ✅ always return array
  } catch (err) {
    console.error("Failed to fetch user locations:", err);
    return []; // ✅ safe fallback
  }
};

// Update current user details
export const updateUser = async (payload) => {
  try {
    const response = await api.put("/users/me", payload);
    return response.data || {}; // ✅ safe fallback
  } catch (err) {
    console.error("Failed to update user:", err);
    throw err;
  }
};

export default api;
