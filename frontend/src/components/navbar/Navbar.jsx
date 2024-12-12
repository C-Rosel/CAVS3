// src/components/navbar/Navbar.jsx

import React, {useState} from 'react'
import msstateLogo from '../../assets/msstate-logo.png'
import { IoSettingsSharp } from "react-icons/io5";
import './Navbar.css'

const Navbar = ({ sidebarOpen, setSidebarOpen, settingsOpen, setSettingsOpen }) => {
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
                    <span className="navbar-title">Dashboard</span>
                </div>

                {/* Left side: Connectivity Info, Settings Icon */}
                <div className="navbar-right">
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