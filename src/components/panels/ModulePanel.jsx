import React from 'react';
import './ModulePanel.css'

const ModulePanel = ({ title, content, onClick, onClose }) => {
  return (
    <div
      className="module-panel"
      onClick={onClick}
    >
        <div className="m-panel-header">
            <div className="m-panel-title">{title}</div>
            <button className="m-panel-close-btn" onClick={onClose}>✖</button>
        </div>
        
        <div className="m-panel-body">{content}</div>
    </div>
  );
};

export default ModulePanel;