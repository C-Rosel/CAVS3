// src/components/navbar/Navbar.jsx

import React, {useState} from 'react'
import msstateLogo from '../../assets/msstate-logo.png'
import { IoSettingsSharp, IoLinkSharp, IoBanSharp    } from "react-icons/io5";
import './Navbar.css'

const Navbar = ({ sidebarOpen, setSidebarOpen, settingsOpen, setSettingsOpen, vehicleName, rosConnected }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Left side: Hamburger icon, Logo, Title */}
                <div className="navbar-left">
                    <div
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`${sidebarOpen ? "active" : ""} reactive-btn ham-icon`}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <img src={msstateLogo} alt='Logo' className="navbar-logo"></img>
                    <span className="navbar-title">CAVS App</span>
                </div>

                {/* Left side: Connectivity Info, Settings Icon */}
                <div className="navbar-right">
                    <div className="vehicle-display">
                        {vehicleName}
                        {/* Ban Icon if ros is not connected */}
                        {!rosConnected && (
                            <IoBanSharp    
                                className = "no-connection-icon"
                                size={58}
                            />                         
                        )}
                        <IoLinkSharp 
                            className = "link-icon"
                            size={50}
                        />
                    </div>
                    <IoSettingsSharp 
                        className="settings-icon" 
                        size={45}
                        onClick={() => setSettingsOpen(!settingsOpen)}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar