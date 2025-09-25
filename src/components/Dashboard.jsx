import React, { useState, useEffect } from "react";
import Greeting from "../components/Greeting";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherSummary, fetchUserLocations } from "../api/api";
import { useAuth } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    let mounted = true;
    const loadWeather = async () => {
      setLoading(true);
      try {
        const cities = await fetchUserLocations();
        if (!mounted || !cities) return;

        const results = await Promise.all(
          cities.map((city) => fetchWeatherSummary(city).catch(() => null))
        );

        if (mounted) {
          setWeatherData(results.filter(Boolean));
        }
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadWeather();
    return () => {
      mounted = false;
    };
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={{ padding: 24, marginTop: 80 }}>
      {user.name ? <Greeting name={user.name} /> : <div>Loading user info...</div>}

      {loading ? (
        <div>Loading weather...</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {weatherData.map((weather, idx) => (
            <WeatherCard key={idx} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );
}
