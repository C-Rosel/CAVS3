import React, { useState } from 'react'
import { IoAddSharp } from "react-icons/io5";
import ModulePanel from './ModulePanel'
import './PanelHandler.css'

/*
* This component handles module panels.
* Active modules are panels currently displayed. 
* Available modules are panels that can be added from the add module menu.
*/
const PanelHandler = ({ activeModules, setActiveModules, availableModules, setAvailableModules }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({}); // Tracks expanded categories

    const handleAddModule = (module) => {
        setActiveModules([...activeModules, module]);
        setAvailableModules(availableModules.filter((m) => m.id !== module.id));
        // Don't reset expandedCategories here
    };

    const handleRemoveModule = (module) => {
        setActiveModules(activeModules.filter((m) => m.id !== module.id));
        setAvailableModules([...availableModules, module]);
    };

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const groupByCategory = (modules) => {
        return modules.reduce((groups, module) => {
            const category = module.category || "Uncategorized";
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(module);
            return groups;
        }, {});
    };

    const AddModuleMenu = ({ availableModules }) => {
        const groupedModules = groupByCategory(availableModules);

        return (
            <div className="add-module-menu">
                <div className="mm-header">
                    <h3>Select a Module to Add:</h3>
                </div>
                <div className="mm-body">
                    {Object.keys(groupedModules).length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {Object.entries(groupedModules).map(([category, modules]) => (
                                <li key={category} className="category-container">
                                    <div
                                        className="category-header"
                                        onClick={() => toggleCategory(category)}
                                        style={{
                                            cursor: "pointer",
                                            padding: "8px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {category}
                                    </div>
                                    {expandedCategories[category] && (
                                        <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
                                            {modules.map((module) => (
                                                <li
                                                    className="module-option"
                                                    key={module.id}
                                                    onClick={() => handleAddModule(module)}
                                                >
                                                    {module.title}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No modules to add</p>
                    )}
                    <button onClick={() => setShowMenu(false)}>Close</button>
                </div>
            </div>
        );
    };

    return (
        <>
            <IoAddSharp
                size={50}
                className="reactive-btn add-module-button"
                onClick={() => setShowMenu(!showMenu)}
            />
            <div className="panel-container">
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
            {showMenu && <AddModuleMenu availableModules={availableModules} />}
        </>
    );
};

export default PanelHandler;