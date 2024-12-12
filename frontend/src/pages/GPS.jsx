import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { IoPlaySharp, IoPauseSharp, IoPowerSharp } from "react-icons/io5";
import { Line } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';
import './GPS.css';
import ROSLIB from 'roslib';
import Chart from 'chart.js/auto';

const NotifControl = ({ message, isVisible }) => {
  const container = useMemo(
    () => (
      <div className={`notif-control ${isVisible ? 'visible' : ''}`}>
        <p>{message}</p>
      </div>
    ),
    [isVisible]
  );

  return (
    <div className={"leaflet-top leaflet-right"}>
      <div className="leaflet-control">{container}</div>
    </div>
  );
};

const WaypointCntrl = ({ distToNextWP, remainingWP, totalWP, currSpeed }) => {
    const container = useMemo(
      () => (
        <div className="wp-control">
          <div> Next Waypoint: {distToNextWP.toFixed(2)} m </div>
          <div> Waypoint: {remainingWP}/{totalWP} </div>
          <hr className="horizontal-separator" />
          <div> Current Speed: {currSpeed.toFixed(3)} m/s </div>
        </div>
      ),
      [distToNextWP, remainingWP, totalWP, currSpeed]
    );
  
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
    []
  );

  return (
    <div className={"leaflet-bottom leaflet-left"}>
      <div className="leaflet-control">{container}</div>
    </div>
  );
};

const GPS = ({ rosInstance, rosConnected }) => {
  const [distToNextWP, setDistToNextWP] = useState(0);
  const [remainingWP, setRemainingWP] = useState(0);
  const [totalWP, setTotalWP] = useState(0);
  const [currSpeed, setCurrSpeed] = useState(0);
  const [waypoints, setWaypoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current waypoint index

  const [accelerationData, setAccelerationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Linear Acceleration (m/s²)',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  });

  const [notifMessage, setNotifMessage] = useState('');
  const [isNotifVisible, setIsNotifVisible] = useState(false);

  const handleAction = (message) => {
    setNotifMessage(message);
    setIsNotifVisible(true);
    setTimeout(() => {
      setIsNotifVisible(false);
    }, 3000);
  };

  const mapPos = [33.4736, -88.7932];

  useEffect(() => {
    if (rosConnected && rosInstance) {
      const distTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/nature/distance_to_current_waypoint',
        messageType: 'std_msgs/Float64',
      });

      const speedTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/nature/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const waypointsTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/nature/waypoints',
        messageType: 'nav_msgs/Path',
      });

      const imuTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/mavs_ros/imu',
        messageType: 'sensor_msgs/Imu',
      });

      distTopic.subscribe((message) => {
        setDistToNextWP(message.data);
      });

      speedTopic.subscribe((message) => {
        const { x, y, z } = message.linear;
        const speed = Math.sqrt(x * x + y * y + z * z);
        setCurrSpeed(speed);
      });

      waypointsTopic.subscribe((message) => {
        const extractedWaypoints = message.poses.map((pose) => ({
          x: pose.pose.position.x,
          y: pose.pose.position.y,
        }));
        setWaypoints(extractedWaypoints);
        setTotalWP(extractedWaypoints.length); // Dynamically set totalWP
      });

      imuTopic.subscribe((message) => {
        const { x, y, z } = message.linear_acceleration;
        const acceleration = Math.sqrt(x * x + y * y + z * z).toFixed(3);

        setAccelerationData((prevData) => {
          const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
          const newData = [...prevData.datasets[0].data, parseFloat(acceleration)];

          if (newLabels.length > 20) {
            newLabels.shift();
            newData.shift();
          }

          return {
            labels: newLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          };
        });
      });

      return () => {
        distTopic.unsubscribe();
        speedTopic.unsubscribe();
        waypointsTopic.unsubscribe();
        imuTopic.unsubscribe();
      };
    }
  }, [rosConnected, rosInstance]);
  useEffect(() => {
    // Ensure remainingWP is calculated based on currentIndex
    setRemainingWP(totalWP - currentIndex);
  }, [totalWP, currentIndex]);

  const handleWaypointReached = (index) => {
    setCurrentIndex(index); // Update to the new waypoint index
  };

  useEffect(() => {
    if (waypoints.length > 0) {
      // Simulate reaching the first waypoint (index 0)
      handleWaypointReached(0);
    }
  }, [waypoints]);

  return (
    <div className="map-container">
      <div className="speed-data">
      <Line
          data={accelerationData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: {
                ticks: {
                  display: false, // Hide timestamps
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Acceleration (m/s²)',
                },
                ticks: {
                  color: 'white',
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white', // Legend text color
                },
              },
            },
          }}
        />
      </div>
      <MapContainer center={mapPos} zoom={16}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {waypoints.map((wp, index) => (
          <Marker key={index} position={[wp.y, wp.x]}>
            <Popup>Waypoint {index + 1}</Popup>
          </Marker>
        ))}
        <Polyline positions={waypoints.map((wp) => [wp.y, wp.x])} />
        <Marker position={mapPos}>
          <Popup>Center for Advanced Vehicular Systems</Popup>
        </Marker>
        <NotifControl message={notifMessage} isVisible={isNotifVisible} />
        <WaypointCntrl
          distToNextWP={distToNextWP}
          remainingWP={remainingWP}
          totalWP={totalWP}
          currSpeed={currSpeed}
        />
        <VehicleControlsCntrl onAction={handleAction} />
      </MapContainer>
    </div>
  );
};

export default GPS;
