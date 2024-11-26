import React, { useState } from 'react'
import ModulePanel from './ModulePanel'
import './PanelHandler.css'


const PanelHandler = () => {
    
    const [showMenu, setShowMenu] = useState(false);
    // Active Module Panels
    const [activeModules, setActiveModules] = useState([
        { id: 1, title: 'Weather', content: 'Sunny, 25°C' },
        { id: 2, title: 'Stock', content: 'AAPL: $150.00' },
    ]);
    // Available to add Module Panels
    const [availableModules, setAvailableModules] = useState([
        { id: 3, title: 'Task', content: '3 pending tasks' },
        { id: 4, title: 'Fitness', content: 'Steps: 10,000' },
        { id: 5, title: 'News', content: 'Top story of the day...' },
    ]);

    const handleAddModule = (module) => {
        setActiveModules([...activeModules, module]); // Add selected module to the dashboard
        setAvailableModules(availableModules.filter((m) => m.id !== module.id)); // Remove module from available list
        // setShowMenu(false);
    };
    const handleRemoveModule = (module) => {
        setActiveModules(activeModules.filter((m) => m.id !== module.id)); 
        setAvailableModules([...availableModules, module])
    }
    

    return (
        <>
        <div className="add-module-button" onClick={() => setShowMenu(!showMenu)}>
            +
        </div>
        <div className='panel-container'>
            {activeModules.map((module) => (
            <ModulePanel
                key={module.id}
                title={module.title}
                content={module.content}
                // onClick={() => handlePanelClick(module.id)}
                onClose={() => handleRemoveModule(module)}
            />
            ))}          
        </div>


        {/* Add Modules Menu */}
        {showMenu && (
        <div className='add-module-menu'>
            <h3>Select a Module to Add:</h3>
            {availableModules.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {availableModules.map((module) => (
                        <li
                            className='module-option'
                            key={module.id}
                            onClick={() => handleAddModule(module)}
                        >
                            {module.title}
                        </li>
                    ))}
                </ul>
            ) : (
                // If availableModules is empty
                <p>No modules to add</p> 
            )}
            <button onClick={() => setShowMenu(!showMenu)}>Close</button>
        </div>
        )}
        </>   
    );
}

export default PanelHandler