import React, { useState, useEffect } from 'react';
// Components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Settings from './components/settings/Settings';
// Pages
import GPS from './pages/GPS';
import Dashboard from './pages/Dashboard';
import Camera from './pages/Camera';
import Sensors from './pages/Sensors';
import Data from './pages/Data';

import './App.css';
import ROSLIB from "roslib";

const App = () => {
  
  // Component States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePage, setActivePage] = useState("GPS");

  // Variables
  const [selectedVehicle, setSelectedVehicle] = useState({name: 'Vehicle 1', ip: '0.0.0.1'})

  // Ros States
  const [ros, setRos] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rosConnected, setRosConnected] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    let rosInstance;

    // Fetch configuration file at runtime
    fetch("/config.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load configuration");
        }
        return response.json();
      })
      .then((config) => {
        // Use the configuration's WebSocket URL
        rosInstance = new ROSLIB.Ros({
          url: config.url || "ws://localhost:9090",
        });

        // Connection Events
        rosInstance.on("connection", () => {
          console.log("Connected to ROS");
          setRosConnected(true);
        });

        rosInstance.on("error", (error) => {
          console.error("Error connecting to ROS:", error);
        });

        rosInstance.on("close", () => {
          console.log("Connection to ROS closed");
          setRosConnected(false);
        });

        // Subscribe to topics
        config.topics.forEach((topicConfig) => {
          const topic = new ROSLIB.Topic({
            ros: rosInstance,
            name: topicConfig.name,
            messageType: topicConfig.messageType,
          });

          topic.subscribe((message) => {
            console.log(`Received message on ${topicConfig.name}:`, message);
            setMessages((prevMessages) => [
              ...prevMessages,
              { topic: topicConfig.name, message },
            ]);
          });
        });

        setRos(rosInstance);
      })
      .catch((error) => {
        console.error("Error loading configuration:", error);
      });

    // Cleanup
    return () => {
      if (rosInstance) {
        rosInstance.close();
      }
    };
  }, []); // Empty dependency array ensures it runs only on mount

  // Render the correct component based on activePage
  const renderPage = () => {
    switch (activePage) {
      case "GPS":
        return <GPS />;
      case "Dashboard":
        return <Dashboard />;
      case "Camera":
        return <Camera />;
      case "Sensors":
        return <Sensors />;
      case "Data":
        return <Data />;
      default:
        return <GPS />;
    }
  };

  return (
    <div className="app-container">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        vehicleName={selectedVehicle.name}
        rosConnected={rosConnected}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <Settings 
        settingsOpen={settingsOpen} 
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? "sidebar-shifted" : ""} ${settingsOpen ? "settings-shifted" : ""}`}>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
