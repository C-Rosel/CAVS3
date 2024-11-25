import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar'
import './App.css'



const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <h1>This is where other stuff will go.</h1>
      </div>
    </div>
  );
}

export default App
