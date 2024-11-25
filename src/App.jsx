import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar';
import './App.css'



const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <h1>Welcome to My App!</h1>
      {/* Other content */}
    </div>
  );
}

export default App
