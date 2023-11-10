import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './tracking.css';
import { Icon } from "leaflet";

const Maps = () => {
  const [markers, setMarkers] = useState([]);
  const [positionHistory, setPositionHistory] = useState([]);


  // Get the reference of the database.
  const db = getDatabase();
  const positionRef = ref(db, 'positions/');

  useEffect(() => {
    // Attach an event listener to the Firebase database to update markers.
    const unsubscribe = onValue(positionRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Extract latitude and longitude from the data and update markers state.
        const newMarkers = Object.values(data).map((position) => ({
          geocode: [position.latitude, position.longitude],
        }))[0];
        setPositionHistory((prevHistory) => [...prevHistory, newMarkers]);

        setMarkers(newMarkers);
      } else {
        console.log('Data not found');
      }
    });
    document.title = "Map";
    return () => unsubscribe();
  }, [positionRef]); // Empty dependency array to run this effect only once

  const custIcon = new Icon({
    iconUrl: require("../Assets/map.png"),
    iconSize: [38, 38]
  });
  console.log('Markers:', markers);

  return (
    <MapContainer center={[5.345317, -4.024429]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {positionHistory.map((position, index) => (
        <Marker key={index} position={position.geocode} icon={custIcon}>
        </Marker>
      ))}
      {positionHistory.length > 1 && (
      <Polyline positions={positionHistory.map((position) => position.geocode)} />
    )}
    </MapContainer>
  );
};

export default Maps;
