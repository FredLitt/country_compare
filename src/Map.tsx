import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function Map({
  firstCountryLatLong,
  secondCountryLatLong,
  rawCountryData,
}: any) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2.4}
      scrollWheelZoom={false}
      style={{ height: "675px", width: "1025px", margin: "auto" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {firstCountryLatLong && (
        <Marker position={firstCountryLatLong}>
          <Popup> {rawCountryData[0].country}</Popup>
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
