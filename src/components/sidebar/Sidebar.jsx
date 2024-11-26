// src/components/navbar/Sidebar.jsx

import React, {useState} from 'react'
import { IoMapSharp, IoCameraSharp, IoRadioSharp, IoBarChartSharp  } from "react-icons/io5";
import './Sidebar.css'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <nav className={`${sidebarOpen ? "open" : ""} sidebar`}>
            <div className='sidebarBtn'><IoMapSharp size={50}/>GPS</div>
            <div className='sidebarBtn'><IoCameraSharp size={50}/>Camera</div>
            <div className='sidebarBtn'><IoRadioSharp size={50}/>Sensors</div>
            <div className='sidebarBtn'><IoBarChartSharp size={50}/>Data</div>
        </nav>
    );
};

export default Sidebar