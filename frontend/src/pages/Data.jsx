import React, {useState} from 'react'
import PanelHandler from '../components/panels/PanelHandler'
import './Data.css'

const Data = () => {
    // Active Module Panels
    const [activeModules, setActiveModules] = useState([
        { id: 1, title: 'vehicle/speed', content: 'Data...' },
        { id: 2, title: 'vehicle/acceleration', content: 'Data...' },
    ]);
    // Available to add Module Panels
    const [availableModules, setAvailableModules] = useState([
        { id: 3, title: 'vehicle/odometryX', content: 'Data...' },
        { id: 4, title: 'vehicle/odometryY', content: 'Data...' },
    ]);

    return (
        <PanelHandler 
            activeModules={activeModules} setActiveModules={setActiveModules} 
            availableModules={availableModules} setAvailableModules={setAvailableModules}
        />
    );
};

export default Data