import React from "react";

export default function MapComponent({ center, zoom, markers }) {
  return (
    <div
      style={{ height: "100%", width: "100%" }}
      ref={(mapDiv) => {
        if (!mapDiv) return;

        const map = new window.google.maps.Map(mapDiv, {
          center,
          zoom,
        });

        markers.forEach((markerPosition) => {
          new window.google.maps.Marker({
            position: markerPosition,
            map,
          });
        });
      }}
    />
  );
}
