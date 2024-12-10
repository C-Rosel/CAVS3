import React, {useState} from 'react'
import PanelHandler from '../components/panels/PanelHandler'
import './Sensors.css'

const Sensors = () => {
    // Active Module Panels
    const [activeModules, setActiveModules] = useState([
        { id: 1, title: 'vehicle/lidar1', content: 'Sensor Data...' },
        { id: 2, title: 'vehicle/lidar2', content: 'Sensor Data...' },
    ]);
    // Available to add Module Panels
    const [availableModules, setAvailableModules] = useState([
        { id: 3, title: 'vehicle/lidar3', content: 'Sensor Data...' },
    ]);

    return (
        <PanelHandler 
            activeModules={activeModules} setActiveModules={setActiveModules} 
            availableModules={availableModules} setAvailableModules={setAvailableModules}
        />
    );
};

export default Sensors