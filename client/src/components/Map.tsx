import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  name: string;
  className?: string;
};

export default function Map({
  latitude,
  longitude,
  name,
  className = "h-80 w-full",
}: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      className={`${className} leaflet-container shadow-md border border-slate-200`}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; Esri"
      />
      <Marker position={[latitude, longitude]}>
        <Tooltip
          permanent
          direction="top"
          className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-md shadow-sm border border-slate-200"
        >
          {name}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
