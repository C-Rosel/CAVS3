import React, {useState} from 'react'
import PanelHandler from '../components/panels/PanelHandler'
import './Dashboard.css'

const Dashboard = () => {
    // Active Module Panels
    const [activeModules, setActiveModules] = useState([
        { id: 1, title: 'vehicle/cam1',         content: 'Camera Data...',  category: "Cameras" },
        { id: 3, title: 'vehicle/speed',        content: 'Data...',         category: "Data" },
        { id: 5, title: 'vehicle/odometryX',    content: 'Data...',         category: "Data" },
        { id: 6, title: 'vehicle/odometryY',    content: 'Data...',         category: "Data" },
    ]);
    // Available to add Module Panels
    const [availableModules, setAvailableModules] = useState([
        { id: 2, title: 'vehicle/cam2',         content: 'Camera Data...',  category: "Cameras" },
        { id: 4, title: 'vehicle/acceleration', content: 'Data...',         category: "Data" },
        { id: 7, title: 'vehicle/lidar1',       content: 'Sensor Data...',  category: "Sensors" },
        { id: 8, title: 'vehicle/lidar2',       content: 'Sensor Data...',  category: "Sensors" },
    ]);

    return (
        <PanelHandler 
            activeModules={activeModules} setActiveModules={setActiveModules} 
            availableModules={availableModules} setAvailableModules={setAvailableModules}
        />
    );
};

export default Dashboard