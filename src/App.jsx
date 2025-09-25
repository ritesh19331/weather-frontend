import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginPage";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import UserDetail from "./components/UserDetail";
import WeatherDetail from "./components/WeatherDetails"; // ✅ import WeatherDetail
import { useAuth } from "./providers/AuthProvider";

export default function App() {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        {/* Login/Register route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : showRegister ? (
              <RegisterForm />
            ) : (
              <LoginForm />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* User Details */}
        <Route
          path="/user-details"
          element={user ? <UserDetail user={user} /> : <Navigate to="/login" replace />}
        />

        
        <Route
          path="/detail"
          element={user ? <WeatherDetail /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/register"
          element={!user ? <RegisterForm /> : <Navigate to="/dashboard" replace />}
        />


        {/* Weather detail page */}
        <Route
          path="/weather-detail"
          element={user ? <WeatherDetail /> : <Navigate to="/login" replace />}
        />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
