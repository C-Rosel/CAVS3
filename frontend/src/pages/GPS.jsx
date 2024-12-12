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

const LegendControl = () => {
    return (
      <div className={"leaflet-bottom leaflet-left"}>
        <div className="leaflet-control legend-control">
          <p><span className="legend-color" style={{ backgroundColor: 'green' }}></span> Global Path</p>
          <p><span className="legend-color" style={{ backgroundColor: 'red' }}></span> Local Path</p>
        </div>
      </div>
    );
  };
  
const WaypointCntrl = ({ distToNextWP, currentWP, totalWP, currSpeed, accelerationData }) => {
    const container = useMemo(
      () => (
        <div className='wp-control'>
          <div> Next Waypoint: {distToNextWP.toFixed(2)} m </div>
          <div> Waypoint: {currentWP}/{totalWP} </div>
          <hr className="horizontal-separator" />
          <div> Current Speed: {currSpeed.toFixed(2)} m/s </div>
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
        </div>
      ),
      [distToNextWP, currentWP, totalWP, currSpeed, accelerationData]
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
  const [currentWP, setCurrentWP] = useState(1); // Start at waypoint 1
  const [totalWP, setTotalWP] = useState(0);
  const [currSpeed, setCurrSpeed] = useState(0);
  const [waypoints, setWaypoints] = useState([]);
  const [globalPath, setGlobalPath] = useState([]); // Global Path
  const [localPath, setLocalPath] = useState([]); // Local Path
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
  const scalingFactor = 0.000001; // Placeholder scaling factor
  const origin = { x: mapPos[1], y: mapPos[0] }; // Placeholder origin

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

      const globalPathTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/nature/global_path',
        messageType: 'nav_msgs/Path',
      });

      const localPathTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/nature/local_path',
        messageType: 'nav_msgs/Path',
      });

      const occupancyGridTopic = new ROSLIB.Topic({
        ros: rosInstance,
        name: '/nature/occupancy_grid',
        messageType: 'nav_msgs/OccupancyGrid',
      });

      globalPathTopic.subscribe((message) => {
        const extractedGlobalPath = message.poses.map((pose) => ({
          x: pose.pose.position.x * scalingFactor + origin.x,
          y: pose.pose.position.y * scalingFactor + origin.y,
        }));
        setGlobalPath(extractedGlobalPath);
      });

      localPathTopic.subscribe((message) => {
        const extractedLocalPath = message.poses.map((pose) => ({
          x: pose.pose.position.x * scalingFactor + origin.x,
          y: pose.pose.position.y * scalingFactor + origin.y,
        }));
        setLocalPath(extractedLocalPath);
      });

      distTopic.subscribe((message) => {
        setDistToNextWP(message.data);

        // Check if the distance to the next waypoint is below a threshold
        if (message.data < 5 && currentWP < waypoints.length) {
          setCurrentWP((prevWP) => prevWP + 1); // Increment current waypoint
        }
      });

      speedTopic.subscribe((message) => {
        const { x, y, z } = message.linear;
        const speed = Math.sqrt(x * x + y * y + z * z);
        setCurrSpeed(speed);
      });

      waypointsTopic.subscribe((message) => {
        const extractedWaypoints = message.poses.map((pose) => ({
          x: pose.pose.position.x * scalingFactor + origin.x,
          y: pose.pose.position.y * scalingFactor + origin.y,
        }));
        setWaypoints(extractedWaypoints);
        setTotalWP(extractedWaypoints.length); // Set total waypoints
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

    //   occupancyGridTopic.subscribe((message) => {
    //     const { resolution, origin } = message.info;
  
    //     // Adjust globalPath
    //     setGlobalPath((prevGlobalPath) =>
    //       prevGlobalPath.map((point) => ({
    //         x: point.x * resolution + origin.position.x,
    //         y: point.y * resolution + origin.position.y,
    //       }))
    //     );
  
    //     // Adjust localPath
    //     setLocalPath((prevLocalPath) =>
    //       prevLocalPath.map((point) => ({
    //         x: point.x * resolution + origin.position.x,
    //         y: point.y * resolution + origin.position.y,
    //       }))
    //     );
  
    //     // Adjust waypoints
    //     setWaypoints((prevWaypoints) =>
    //       prevWaypoints.map((point) => ({
    //         x: point.x * resolution + origin.position.x,
    //         y: point.y * resolution + origin.position.y,
    //       }))
    //     );
    //   });

      return () => {
        distTopic.unsubscribe();
        speedTopic.unsubscribe();
        waypointsTopic.unsubscribe();
        imuTopic.unsubscribe();
        globalPathTopic.unsubscribe();
        localPathTopic.unsubscribe();
        //occupancyGridTopic.unsubscribe();
      };
    }
}, [rosConnected, rosInstance, waypoints.length, currentWP]);

  return (
    <div className="map-container">
      <MapContainer center={mapPos} zoom={25}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {waypoints.map((wp, index) => (
          <Marker key={index} position={[wp.y, wp.x]}>
            <Popup>Waypoint {index + 1}</Popup>
          </Marker>
        ))}
        <Polyline positions={waypoints.map((wp) => [wp.y, wp.x])} color="blue" />
        <Polyline positions={globalPath.map((gp) => [gp.y, gp.x])} color="green" />
        <Polyline positions={localPath.map((lp) => [lp.y, lp.x])} color="red" />
        <Marker position={mapPos}>
          <Popup>Center for Advanced Vehicular Systems</Popup>
        </Marker>
        <LegendControl />
        <NotifControl message={notifMessage} isVisible={isNotifVisible} />
        <WaypointCntrl
          distToNextWP={distToNextWP}
          currentWP={currentWP}
          totalWP={totalWP}
          currSpeed={currSpeed}
          accelerationData={accelerationData}
        />
        <VehicleControlsCntrl onAction={handleAction} />
      </MapContainer>
    </div>
  );
};

export default GPS;
