import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Settings from './components/settings/Settings'
import GPS from './pages/GPS'
import Camera from './pages/Camera'
import Sensors from './pages/Sensors'
import Data from './pages/Data'
import './App.css'



const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Camera");

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
