import React, { useState, useEffect } from 'react';
import BaseMetricsModal from './BaseMetricsModal'; // Import the modal component
import './BaseMetricsModalContainer.css'

const BaseMetricsModalContainer = ({ isNewUser }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Automatically open the modal if the user is new
        if (isNewUser) {
            setShowModal(true);
        }
    }, [isNewUser]);

    const handleModalClose = () => {
        setShowModal(false);
        // Additional logic when modal is closed (e.g., updating user status)
        isNewUser = false
    };

    const handleModalSubmit = (metrics) => {
        // Handle the submission of metrics here
        // For example, send them to the backend
        console.log(metrics); // Replace with actual submission logic

        // Close the modal after submission
        setShowModal(false);
    };

    return (
        <BaseMetricsModal
            isOpen={showModal}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
        />
    );
};

export default BaseMetricsModalContainer;
