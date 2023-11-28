import React, { useState } from 'react';
import './Goals.css';

const GoalsMotivationComponent = () => {
    const [goals, setGoals] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit logic goes here
        console.log('Goals submitted:', goals);
    };

    return (
        <div className="goals-motivation">
            <h2>Goals & Motivations</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="goals"
                    placeholder="Enter your goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                ></textarea>
                <button type="submit">Update Goals</button>
            </form>
        </div>
    );
};

export default GoalsMotivationComponent;
