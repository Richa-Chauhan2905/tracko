import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  name: string;
};

export default function Map({ latitude, longitude, name }: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      className="leaflet-container"
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[latitude, longitude]}>
        <Popup>
          <strong>{name}</strong>
          <br />
          Current Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}
