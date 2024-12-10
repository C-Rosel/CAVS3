import React, { useState } from 'react'
import ModulePanel from './ModulePanel'
import './PanelHandler.css'

/*
* This component handles module panels.
* Active modules are panels currently displayed. 
* Available modules are panels that can be added from the add module menu.
*/
const PanelHandler = ({activeModules, setActiveModules, availableModules, setAvailableModules}) => {
    
    const [showMenu, setShowMenu] = useState(false);

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