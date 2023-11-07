// MyGoogleMap.js
import React, { useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";

const render = (status) => {
  if (status === Status.LOADING) return <p>Loading...</p>;
  if (status === Status.FAILURE) return <p>Error loading map</p>;
  return null;
};

// Add this inside the MyGoogleMap component

const GoogleMap = () => {
  const [center, setCenter] = useState({});
  const [markers, setMarkers] = useState([center]);
  const zoom = 8;

  const addMarker = (newMarker) => {
    setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(coords);
          addMarker(coords);
        },
        (error) => {
          console.error("Error fetching geolocation", error);
        }
      );
    }
  }, []);

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API} render={render}>
      <MapComponent center={center} zoom={zoom} markers={markers} />
    </Wrapper>
  );
};

export default GoogleMap;
