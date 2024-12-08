import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Settings from './components/settings/Settings'
import GPS from './pages/GPS'
import Camera from './pages/Camera'
import Sensors from './pages/Sensors'
import Data from './pages/Data'
import './App.css'
import ROSLIB from "roslib";



const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Camera");

  const [ros, setRos] = useState(null); // ROS "backend"
  const [messages, setMessages] = useState([]);
  const [rosConnected, setRosConnected] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Fetch configuration file at runtime
    fetch("/config.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load configuration");
            }
            return response.json();
        })
        .then((config) => {
            // Connect to ROS using the configuration
            const rosConnection = new ROSLIB.Ros({
                url: `ws://localhost:9090`,
            });

            // Handle connection events
            rosConnection.on("connection", () => {
                console.log("Connected to ROS");
            });

            rosConnection.on("error", (error) => {
                console.error("Error connecting to ROS:", error);
            });

            rosConnection.on("close", () => {
                console.log("Connection to ROS closed");
            });

            // Subscribe to configured topics
            config.topics.forEach((topicConfig) => {
                const topic = new ROSLIB.Topic({
                    ros: rosConnection,
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

            setRos(rosConnection);
        })
        .catch((error) => {
            console.error("Error loading configuration:", error);
        });

    // Cleanup on component unmount
    return () => {
        if (ros) {
            ros.close();
        }
    };
  }, []);

    // Render the correct component based on activePage
    const renderPage = () => {
      switch (activePage) {
        case "Camera":
          return <Camera />;
        case "Sensors":
          return <Sensors />;
        case "Data":
          return <Data />;
        default:
          return <Camera />; // Default to Camera if activePage is undefined or doesn't match
      }
    };

  return (
    <div className="app-container">
      <Navbar 
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} 
        settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}
      />
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        activePage={activePage} setActivePage={setActivePage}
      />
      <Settings 
        settingsOpen={settingsOpen} 
      />

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-shifted' : ''} ${settingsOpen ? 'settings-shifted' : ''}`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App
