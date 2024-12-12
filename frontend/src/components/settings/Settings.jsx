// src/components/navbar/Sidebar.jsx

import React, {useState, useEffect} from 'react'
import { IoChevronDownSharp, IoChevronForwardSharp } from "react-icons/io5";
import ToggleSwitch from '../buttons/ToggleSwitch'
import './Settings.css'
import '../../index.css'


// TODO: This could be derived from a generic dropdown button in the future. I'm too lazy rn
const VehicleDropdown = ({ selectedVehicle, setSelectedVehicle }) => {
    const [expanded, setExpanded] = useState(false);  // For the dropdown toggle
  
    const toggleDropdown = () => {
      setExpanded(!expanded);
    };
  
    const handleSelectVehicle = (vehicle) => {
      setSelectedVehicle(vehicle); // Set the selected vehicle
      setExpanded(false);  // Close the dropdown after selecting
    };

    const vehicles = [
        { id: 1, name: 'Vehicle 1', ip: '192.168.1.1' },
        { id: 2, name: 'Vehicle 2', ip: '192.168.1.2' },
        { id: 3, name: 'Vehicle 3', ip: '192.168.1.3' },
    ];
  
    return (
      <div className="vehicle-dropdown">
        <div className="vh-label">Selected Vehicle</div>
        {/* Dropdown header */}
        <div className="vh-category-header" onClick={toggleDropdown}>
          {selectedVehicle ? selectedVehicle.name : 'Select Vehicle'}
          {expanded ? <IoChevronDownSharp /> : <IoChevronForwardSharp />}
        </div>
  
        {/* Dropdown options */}
        {expanded && (
          <ul className="vehicle-options">
            {vehicles.map((vehicle) => (
              <li
                key={vehicle.id}
                className="vehicle-option"
                onClick={() => handleSelectVehicle(vehicle)}
              >
                {vehicle.name}
              </li>
            ))}
          </ul>
        )}
        {/* Display selected vehicle details */}
        {selectedVehicle && (
            <div className="vehicle-details">
                <p><strong>Vehicle Details</strong></p>
                <p><strong>Name:</strong> {selectedVehicle.name}</p>
                <p><strong>IP:</strong> {selectedVehicle.ip}</p>
            </div>
        )}
      </div>
    );
};


const Settings = ({ settingsOpen, selectedVehicle, setSelectedVehicle }) => {
    // State to track the current theme
    const [theme, setTheme] = useState('dark');

    // Effect to apply theme to the document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Toggle theme between light and dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    return (
        <nav className={`${settingsOpen ? "open" : ""} settings`}>
            <ToggleSwitch 
                label="Light Mode" 
                onSwitch={() => toggleTheme()}
            />
            <VehicleDropdown 
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
            />
        </nav>
    );
};

export default Settings