// src/components/FullMap.tsx
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  name: string;
};

export default function FullMap({ latitude, longitude, name }: Props) {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false} // optional: hide zoom buttons for cleaner look
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
        />
        <Marker position={[latitude, longitude]}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            {name}
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}