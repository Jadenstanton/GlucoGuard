import React, { useState } from 'react';
import './BaseMetricsModal.css';

const BaseMetricsModal = ({ isOpen, onClose, onSubmit }) => {
    const [metrics, setMetrics] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMetrics({ ...metrics, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(metrics);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="base-metrics-modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>Enter Your Base Metrics</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={metrics.name} onChange={handleChange} />
                    <input type="number" name="age" placeholder="Age" value={metrics.age} onChange={handleChange} />
                    <input type="number" name="weight" placeholder="Weight" value={metrics.weight} onChange={handleChange} />
                    <input type="number" name="height" placeholder="Height" value={metrics.height} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BaseMetricsModal;
