import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const getMapZoom = () => {
  return window.matchMedia("(min-width: 600px)").matches ? 2.6 : 2.4;
};

export default function Map({
  firstCountryLatLong,
  secondCountryLatLong,
  rawCountryData,
}: any) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={getMapZoom()}
      scrollWheelZoom={false}
      style={{ height: "59vw", width: "95vw", margin: "auto" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {firstCountryLatLong && (
        <Marker position={firstCountryLatLong}>
          <Popup>{rawCountryData[0].country}</Popup>
        </Marker>
      )}
      {secondCountryLatLong && (
        <Marker position={secondCountryLatLong}>
          <Popup>{rawCountryData[1].country}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
