import React, { useState } from 'react'
import { IoAddSharp, IoChevronDownSharp, IoChevronForwardSharp  } from "react-icons/io5";
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
        const newActiveModules = [...activeModules, module].sort((a, b) => a.id - b.id);
        setActiveModules(newActiveModules);

        const newAvailableModules = availableModules.filter((m) => m.id !== module.id);
        setAvailableModules(newAvailableModules);
    };

    const handleRemoveModule = (module) => {
        const newActiveModules = activeModules.filter((m) => m.id !== module.id);
        setActiveModules(newActiveModules);

        const newAvailableModules = [...availableModules, module].sort((a, b) => a.id - b.id);
        setAvailableModules(newAvailableModules);
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
        const groupedModules = groupByCategory(availableModules.sort((a, b) => a.id - b.id));

        return (
            <div className="add-module-menu">
                {/* HEADER */}
                <div className="mm-header">
                    <h3>Select a Module to Add:</h3>
                    <button 
                        className="reactive-btn mm-close-btn" 
                        onClick={() => {
                            setShowMenu(false);
                            setExpandedCategories({}); // Reset categories when menu is closed
                        }}
                    >
                        ✖
                    </button>
                </div>
                {/* BODY */}
                <div className="mm-body">
                    {/* If there are any available modules */}
                    {Object.keys(groupedModules).length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {Object.entries(groupedModules).map(([category, modules]) => (
                                // List each category as a dropdown
                                <li key={category} className="category-container">
                                    <div
                                        className="category-header"
                                        onClick={() => toggleCategory(category)}
                                    >
                                        {category}
                                        {expandedCategories[category] ? (
                                            <IoChevronDownSharp />
                                        ) : (
                                            <IoChevronForwardSharp />
                                        )}
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
                        <p className="no-modules">No modules available to add.</p>
                    )}
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