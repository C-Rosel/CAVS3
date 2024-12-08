// src/components/navbar/Sidebar.jsx

import React, {useState, useEffect} from 'react'
import ToggleSwitch from '../buttons/ToggleSwitch'
import './Settings.css'
import '../../index.css'

const Settings = ({ settingsOpen }) => {
    // State to track the current theme
    const [theme, setTheme] = useState('dark');

    // Effect to apply theme to the document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Toggle theme between light and dark
    const toggleTheme = () => {
        console.log("switch")
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    return (
        <nav className={`${settingsOpen ? "open" : ""} settings`}>
            <ToggleSwitch label="Light Mode" onSwitch={() => toggleTheme()}/>
        </nav>
    );
};

export default Settings