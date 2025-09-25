import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load token and fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser(token);
    } else {
      setAuthLoading(false);
    }
  }, []);

  // Fetch user details from API
  const fetchUser = async (token) => {
    try {
      setAuthLoading(true);
      const response = await axios.get(`http://localhost:8080/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setUser(response.data);
        localStorage.setItem("userName", response.data.name || "User");
      }
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // Login: save token & fetch user
  const login = async (loginResponse) => {
    const token = loginResponse.token;

    if (token) {
      localStorage.setItem("token", token);
      await fetchUser(token); // ✅ only pass token
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
