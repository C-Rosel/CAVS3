import React, {useState} from 'react'
import PanelHandler from '../components/panels/PanelHandler'
import './Dashboard.css'

const Dashboard = () => {
    // Active Module Panels
    const [activeModules, setActiveModules] = useState([
    ]);
    // Available to add Module Panels
    const [availableModules, setAvailableModules] = useState([
        { id: 1, title: 'vehicle/cam1', content: 'Camera Data...' },
        { id: 2, title: 'vehicle/cam2', content: 'Camera Data...' },
        { id: 3, title: 'vehicle/speed', content: 'Data...' },
        { id: 4, title: 'vehicle/acceleration', content: 'Data...' },
        { id: 5, title: 'vehicle/odometryX', content: 'Data...' },
        { id: 6, title: 'vehicle/odometryY', content: 'Data...' },
        { id: 7, title: 'vehicle/lidar1', content: 'Sensor Data...' },
        { id: 8, title: 'vehicle/lidar2', content: 'Sensor Data...' },
    ]);

    return (
        <PanelHandler 
            activeModules={activeModules} setActiveModules={setActiveModules} 
            availableModules={availableModules} setAvailableModules={setAvailableModules}
        />
    );
};

export default Dashboard