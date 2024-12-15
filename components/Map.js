'use client';
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiYWRpdGktYWciLCJhIjoiY200ZWxvcGdpMHIxOTJtczhheHJyYmo2OSJ9.UVoAs_hsC7Xfg-76UA9uSw";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.5946, 12.9716],
      zoom: 12,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");

    const generateRandomMarkers = (numMarkers) => {
      const markers = [];
      for (let i = 0; i < numMarkers; i++) {
        const randomLng = 77.5946 + (Math.random() - 0.5) * 0.1;
        const randomLat = 12.9716 + (Math.random() - 0.5) * 0.1;
        markers.push([randomLng, randomLat]);
      }
      return markers;
    };

    const randomMarkers = generateRandomMarkers(5);

    randomMarkers.forEach((coords, index) => {
      const marker = new mapboxgl.Marker().setLngLat(coords).addTo(mapInstance);

      const popup = new mapboxgl.Popup({ offset: 25 }).setLngLat(coords)
        .setHTML(`
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 8px 0; color: #1e3a8a;">Center ${index + 1}</h3>
            <p style="margin: 0; color: #475569;">Location: [${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}]</p>
          </div>
        `);

      marker.setPopup(popup);
    });

    return () => mapInstance.remove();
  }, []);

  return (
    <div style={mapWrapperStyle}>
      <div
        ref={mapContainerRef}
        style={mapContainerStyle}
      />
    </div>
  );
};

const mapWrapperStyle = {
  width: "100%",
  maxWidth: "1200px", // Matches the max-width of other sections
  margin: "0 auto", // Centers the map horizontally
  padding: "0 20px", // Consistent padding with other sections
};

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  border: "2px solid #e2e8f0",
  margin: "20px 0",
};

export default Map;
