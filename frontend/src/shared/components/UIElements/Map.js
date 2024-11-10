import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    if (typeof window.google !== "undefined") {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapId: "6bb45a0b9c2551a9",
      });

      // Check if AdvancedMarkerElement is available
      if (
        window.google.maps.marker &&
        window.google.maps.marker.AdvancedMarkerElement
      ) {
        new window.google.maps.marker.AdvancedMarkerElement({
          position: center,
          map: map,
        });
      } else {
        console.error("AdvancedMarkerElement is not available");
        // Fallback: Use a regular marker instead
        new window.google.maps.Marker({
          position: center,
          map: map,
        });
      }
    } else {
      console.error("Google Maps API is not loaded");
    }
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
