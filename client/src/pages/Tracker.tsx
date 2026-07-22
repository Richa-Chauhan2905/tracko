// src/pages/Tracker.tsx
import { useEffect, useState } from "react";
import FullMap from "../components/FullMap";
import { api } from "../api/api.js";

export default function Tracker() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await api.get("/locations/current");
        setLocation({
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          name: response.data.name,
        });
      } catch (error) {
        console.error("Failed to get location", error);
      }
    }
    getLocation();
    const interval = setInterval(getLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!location) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <p>Loading driver location…</p>
      </div>
    );
  }

  return (
    <FullMap
      latitude={location.latitude}
      longitude={location.longitude}
      name={location.name}
    />
  );
}
