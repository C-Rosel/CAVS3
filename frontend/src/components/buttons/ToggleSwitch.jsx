import React from 'react'
import './ToggleSwitch.css'

// Don't ask me what any of this means
const ToggleSwitch = ({ label, onSwitch }) => {
    return (
        <div className="toggle-switch-container">
            <div className="toggle-switch-title">{label}</div>
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="checkbox"
                    name={label}
                    id={label}
                    onChange={onSwitch}
                />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
}

export default ToggleSwitch