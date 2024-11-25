// src/components/navbar/Sidebar.jsx

import React, {useState} from 'react'
import './Sidebar.css'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <nav className={`${sidebarOpen ? "open" : ""} sidebar`}>
            <div className='sidebarBtn'></div>
            <div className='sidebarBtn '></div>
            <div className='sidebarBtn '></div>
        </nav>
    );
};

export default Sidebar