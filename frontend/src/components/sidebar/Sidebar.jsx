// src/components/navbar/Sidebar.jsx

import React, {useState} from 'react'
import { IoMapSharp, IoCameraSharp, IoRadioSharp, IoBarChartSharp  } from "react-icons/io5";
import './Sidebar.css'

const Sidebar = ({ sidebarOpen, activePage, setActivePage }) => {
    return (
        <nav className={`${sidebarOpen ? "open" : ""} sidebar`}>
            <div className='sidebarBtn' onClick={() => setActivePage("GPS")}> <IoMapSharp size={50}/> GPS </div>
            <div className='sidebarBtn' onClick={() => setActivePage("Camera")}> <IoCameraSharp size={50}/> Camera </div>
            <div className='sidebarBtn' onClick={() => setActivePage("Sensors")}> <IoRadioSharp size={50}/> Sensors </div>
            <div className='sidebarBtn' onClick={() => setActivePage("Data")}> <IoBarChartSharp size={50}/> Data </div>
        </nav>
    );
};

export default Sidebar