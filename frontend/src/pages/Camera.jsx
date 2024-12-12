import React, {useState} from 'react'
import PanelHandler from '../components/panels/PanelHandler'
import './Camera.css'

const Camera = () => {
    // Active Module Panels
    const [activeModules, setActiveModules] = useState([
        { id: 1, title: 'vehicle/cam1', content: 'Camera Data...', category: "Cameras" },
        { id: 2, title: 'vehicle/cam2', content: 'Camera Data...', category: "Cameras" },
    ]);
    // Available to add Module Panels
    const [availableModules, setAvailableModules] = useState([
        { id: 3, title: 'vehicle/cam3', content: 'Camera Data...', category: "Cameras" },
        { id: 4, title: 'vehicle/cam4', content: 'Camera Data...', category: "Cameras" },
        { id: 5, title: 'vehicle/cam5', content: 'Camera Data...', category: "Cameras" },
    ]);

    return (
        <PanelHandler 
            activeModules={activeModules} setActiveModules={setActiveModules} 
            availableModules={availableModules} setAvailableModules={setAvailableModules}
        />
    );
};

export default Camera