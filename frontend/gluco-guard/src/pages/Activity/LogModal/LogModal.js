import React from 'react';
import './LogModal.css';

const LogModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* <button onClick={onClose}>Close</button> */}
                {children}
            </div>
        </div>
    );
};

export default LogModal;
