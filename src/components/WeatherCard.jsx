import React from "react";
import { useNavigate } from "react-router-dom";

export default function WeatherCard({ weather }) {
  const navigate = useNavigate();
  if (!weather) return null;

  return (
    <div
      onClick={() => navigate("/detail", { state: { weather } })}
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        cursor: "pointer",
        width: 320,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{weather.location}</div>
      <div style={{ fontSize: 28, fontWeight: 600 }}>{Math.round(weather.temperature)}°</div>
      <div style={{ fontSize: 14 }}>{weather.condition}</div>
      <div style={{ marginTop: 8, fontSize: 12, color: "#444" }}>
        Humidity: {weather.humidity}% • Wind: {weather.windSpeed} m/s
      </div>
    </div>
  );
}
