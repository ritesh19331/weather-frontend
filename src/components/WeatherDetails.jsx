import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WeatherDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const weather = state?.weather;

  if (!weather)
    return (
      <div style={{ padding: 50 }}>
        <p>No detail available.</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );

  return (
    <div style={{ padding: 50 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>
        ← Back
      </button>
      <h3>Detailed Weather — {weather.location}</h3>
      <p>Temperature: {weather.temperature}°</p>
      <p>Condition: {weather.condition}</p>
      <p>Precipitation: {weather.precipitation} mm</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind speed: {weather.windSpeed} m/s</p>
    </div>
  );
}
