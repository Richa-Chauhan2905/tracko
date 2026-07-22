import { useEffect, useState } from "react";
import Map from "../components/Map";
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

        console.log("LOCATION:", response.data);

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

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Track Driver</h1>

      {location && (
        <>
          <p>Lat: {location.latitude}</p>
          <p>Lng: {location.longitude}</p>

          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            name={location.name}
          />
        </>
      )}
    </div>
  );
}
