import React, { useState } from 'react';

const AccountSettings = () => {
    // State for the account preferences form
    const [formState, setFormState] = useState({
        email: '',
        phoneNumber: '',
        age: '',
        height: '',
        weight: '',
    });

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formState);
    };

    // Handles input changes and updates the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="account-preferences">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleChange}
                />

                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    value={formState.age}
                    onChange={handleChange}
                />

                <label htmlFor="height">Height (in cm):</label>
                <input
                    type="number"
                    name="height"
                    id="height"
                    value={formState.height}
                    onChange={handleChange}
                />

                <label htmlFor="weight">Weight (in kg):</label>
                <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={formState.weight}
                    onChange={handleChange}
                />

                
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default AccountSettings;
