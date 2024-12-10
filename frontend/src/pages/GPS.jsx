import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './GPS.css'

const GPS = () => {
    const position = [37.7749, -122.4194]; // Latitude and Longitude

    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={position}>
                <Popup>San Francisco</Popup>
                </Marker>
            </MapContainer>            
        </div>
    );
};

export default GPS