// src/pages/Driver.tsx
import { useEffect, useState } from "react";
import { api } from "../api/api.js";
import FullMap from "../components/FullMap";
import { Play } from "lucide-react";
import "./Driver.css"; // import the CSS

export default function Driver() {
  const [tripId, setTripId] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  async function startTrip() {
    try {
      const response = await api.post("/trips/start");
      console.log("Trip started:", response.data);
      setTripId(response.data.trip.id);
    } catch (error) {
      console.error("Failed to start trip", error);
    }
  }

  useEffect(() => {
    if (!tripId) return;
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude });
        try {
          await api.post("/locations", {
            tripId,
            latitude,
            longitude,
            accuracy,
          });
          console.log("Location sent");
        } catch (error) {
          console.error("Failed to send location", error);
        }
      },
      (error) => console.error("GPS Error:", error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [tripId]);

  return (
    <div className="driver-page">
      {!tripId && (
        <button className="driver-start-btn" onClick={startTrip}>
          <Play /> Start Trip
        </button>
      )}

      {location ? (
        <FullMap
          latitude={location.latitude}
          longitude={location.longitude}
          name={user.name || "Driver"}
        />
      ) : (
        <div className="driver-loading">
          <p>
            {tripId
              ? "Acquiring GPS signal..."
              : "Start trip to share location"}
          </p>
        </div>
      )}
    </div>
  );
}
