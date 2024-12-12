import React from 'react';
import './ModulePanel.css'

const ModulePanel = ({ title, content, onClose }) => {
  return (
    <div
      className="module-panel"
    >
        <div className="m-panel-header">
            <div className="m-panel-title">{title}</div>
            <button className="reactive-btn m-panel-close-btn" onClick={onClose}>✖</button>
        </div>
        
        <div className="m-panel-body">{content}</div>
    </div>
  );
};

export default ModulePanel;