import React, { useState, useEffect } from 'react';
import { useBaseMetrics } from '../../../context/BaseMetricsContext';
import BaseMetricsModal from './BaseMetricsModal'; // Import the modal component
import './BaseMetricsModalContainer.css'

const BaseMetricsModalContainer = ({ isNewUser }) => {
    const [showModal, setShowModal] = useState(false);
    const { baseMetrics, handleBaseMetricsChange } = useBaseMetrics();

    useEffect(() => {
        if (isNewUser) {
            setShowModal(true);
        }
    }, [isNewUser]);

    const handleModalClose = () => {
        setShowModal(false);
        isNewUser = false
    };

    const handleModalSubmit = (metrics) => {
        // Handle the submission of metrics here
        // For example, send them to the backend
        console.log(metrics); // Replace with actual submission logic

        setShowModal(false);
    };

    return (
        <BaseMetricsModal
            isOpen={showModal}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            baseMetrics={baseMetrics}
            onBaseMetricsChange={handleBaseMetricsChange}
        />
    );
};

export default BaseMetricsModalContainer;
