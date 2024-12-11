import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// TODO: Add clickable icons to the controls
import { IoPlaySharp } from "react-icons/io5";
import 'leaflet/dist/leaflet.css';
import './GPS.css'


const WaypointCntrl = ({ distToNextWP, remainingWP, totalWP, currSpeed }) => {
    const map = useMap();
  
    useEffect(() => {
      // Create a custom control with HTML content
      const customControl = L.control({ position: 'bottomright' });
  
      customControl.onAdd = () => {
        const div = L.DomUtil.create('div', 'wp-control');
        div.innerHTML = 
            `<div> Next Waypoint: ${distToNextWP.toFixed(2)} </div>
             <div> Remaining Waypoints: ${remainingWP}/${totalWP} </div>
             <hr class="horizontal-separator">
             <div> Current Speed: ${currSpeed} </div>
             <div class=speed-data> </div>`;
        return div;
      };
  
      // Add the control to the map
      customControl.addTo(map);
  
      return () => {
        // Clean up when the component is unmounted
        customControl.remove();
      };
    }, [map, distToNextWP, remainingWP, totalWP, currSpeed]);
  
    return null;
};

const VehicleControlsCntrl = ({ distToNextWP, remainingWP, totalWP, currSpeed }) => {
    const map = useMap();
  
    useEffect(() => {
      // Create a custom control with HTML content
      const customControl = L.control({ position: 'bottomleft' });
  
      customControl.onAdd = () => {
        const div = L.DomUtil.create('div', 'vh-controls-control');
        div.innerHTML = 
            `<div></div>`;
        return div;
      };
  
      // Add the control to the map
      customControl.addTo(map);

      return () => {
        // Clean up when the component is unmounted
        customControl.remove();
      };
    }, [map, distToNextWP]);
  
    return null;
};

const GPS = () => {
    const [distToNextWP, setDistToNextWP] = useState(0);
    const [remainingWP, setRemainingWP] = useState(0);
    const [totalWP, setTotalWP] = useState(0);
    const [currSpeed, setCurrSpeed] = useState(0);


    const mapPos = [37.7749, -122.4194]; // Latitude and Longitude

    return (
        <div className="map-container">
            <MapContainer center={mapPos} zoom={13} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={mapPos}>
                <Popup>San Francisco</Popup>
                </Marker>
                <WaypointCntrl 
                    distToNextWP={distToNextWP}
                    remainingWP={remainingWP}
                    totalWP={totalWP}
                    currSpeed={currSpeed}
                />
                <VehicleControlsCntrl />
            </MapContainer>            
        </div>
    );
};

export default GPS