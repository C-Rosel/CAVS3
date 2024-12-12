import React, { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { IoPlaySharp, IoPauseSharp, IoPowerSharp } from "react-icons/io5";
import 'leaflet/dist/leaflet.css';
import './GPS.css'


const NotifControl = ({ message, isVisible }) => {
  const container = useMemo(
    () => (
        <div className={`notif-control ${isVisible ? 'visible' : ''}`}>
          <p>{message}</p>
        </div>
    ),
    [isVisible],
  )

  return (
    <div className={"leaflet-top leaflet-right"}>
      <div className="leaflet-control">{container}</div>
    </div>
  );
};


const WaypointCntrl = ({ distToNextWP, remainingWP, totalWP, currSpeed }) => {
  const container = useMemo(
    () => (
      <div className='wp-control'>
        <div> Next Waypoint: {distToNextWP.toFixed(2)} </div>
        <div> Remaining Waypoints: {remainingWP}/{totalWP} </div>
        <hr className="horizontal-separator" />
        <div> Current Speed: {currSpeed} </div>
        <div className="speed-data"> </div>    
      </div>
    ),
    [distToNextWP, remainingWP, totalWP, currSpeed],
  )

  return (
    <div className={"leaflet-bottom leaflet-right"}>
      <div className="leaflet-control">{container}</div>
    </div>
  );
};

const VehicleControlsCntrl = ({ onAction }) => {
  const container = useMemo(
    () => (
      <div className='vh-controls-control'>
        <IoPlaySharp
          className="reactive-btn vhc-btn start-btn"
          size={50} 
          onClick={() => onAction("Vehicle Starting...")}
        />
        <div className="vertical-separator"></div>
        <IoPauseSharp 
          className="reactive-btn vhc-btn pause-btn"
          size={50} 
          onClick={() => onAction("Vehicle Pausing...")}
        />
        <div className="vertical-separator"></div>
        <IoPowerSharp 
          className="reactive-btn vhc-btn shutdown-btn"
          size={50} 
          onClick={() => onAction("Vehicle Shutting Down...")}
        />
      </div>
    ),
    [],
  )

  return (
    <div className={"leaflet-bottom leaflet-left"}>
      <div className="leaflet-control">{container}</div>
    </div>
  );
};

const GPS = () => {
    const [distToNextWP, setDistToNextWP] = useState(0);
    const [remainingWP, setRemainingWP] = useState(0);
    const [totalWP, setTotalWP] = useState(0);
    const [currSpeed, setCurrSpeed] = useState(0);

    const [notifMessage, setNotifMessage] = useState('');
    const [isNotifVisible, setIsNotifVisible] = useState(false);
    // Function to handle notification
    const handleAction = (message) => {
      setNotifMessage(message);
      setIsNotifVisible(true);
      setTimeout(() => {
        setIsNotifVisible(false);
      }, 3000); // Fade out after 3 seconds
    };


    const mapPos = [33.4736, -88.7932]; // Latitude and Longitude

    return (
        <div className="map-container">
            <MapContainer center={mapPos} zoom={16} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={mapPos}>
                <Popup>Center for Advanced Vehicular Systems</Popup>
                </Marker>
                <NotifControl message={notifMessage} isVisible={isNotifVisible}/>
                <WaypointCntrl 
                    distToNextWP={distToNextWP}
                    remainingWP={remainingWP}
                    totalWP={totalWP}
                    currSpeed={currSpeed}
                />
                <VehicleControlsCntrl onAction={handleAction}/>
            </MapContainer>            
        </div>
    );
};

export default GPS