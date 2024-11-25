// src/components/navbar/Navbar.jsx

import React, {useState} from 'react'
import msstateLogo from '../../assets/msstate-logo.png'
import './Navbar.css'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Left side: Hamburger icon and Logo */}
                <div className="navbar-left">
                    <div
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`${sidebarOpen ? "active" : ""} ham-icon`}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <img src={msstateLogo} alt='Logo' className="navbar-logo"></img>
                    <span className="navbar-title">Dashboard</span>
                </div>

                <div className="navbar-right">
                    <span>settings</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar