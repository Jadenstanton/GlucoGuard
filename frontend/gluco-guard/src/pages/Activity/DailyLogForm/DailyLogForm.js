import React, { useState } from "react";
import { addActivity } from "../../../services/activityService";
import { useActivityContext } from "../../../context/ActivityContext";
import LogModal from "../LogModal/LogModal";
import './DailyLogForm.css';

const DailyLogForm = () => {
    const [activityType, setActivityType] = useState("");
    const [activityTitle, setActivityTitle] = useState("");
    const [activityDescription, setActivityDescription] = useState("");
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [intensity, setIntensity] = useState(5);
    const [breathRate, setBreathRate] = useState(0);
    const [heartRate, setHeartRate] = useState(0);
    const { logActivity } = useActivityContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };



    const intensityLevels = {
        0: "Light",
        5: "Moderate",
        10: "Vigorous"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const totalDuration = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
        const activityZoneMinutes = totalDuration;

        const logData = {
            user_id: userId,
            activity_type: activityType,
            title: activityTitle,
            description: activityDescription,
            duration: totalDuration,
            activity_zone_minutes: activityZoneMinutes,
            heart_rate: parseInt(heartRate, 10),
            breathing_rate: parseInt(breathRate, 10),
        };

        try {
            const responseData = await addActivity(logData);
            if (responseData && responseData.data) {
                logActivity(responseData.data);
            }
        } catch (error) {
            console.error('Error during the fetch:', error);
        }
    };


    return (
        <div className="daily-log-section">
            <button onClick={toggleModal}>{isModalOpen ? 'Close' : 'Log Activity'}</button>
            <LogModal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="daily-log-form">
                    <h1>Daily Log</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="activity-type">Activity Type</label>
                            <select
                                id="activity-type"
                                name="activity-type"
                                value={activityType}
                                onChange={(e) => setActivityType(e.target.value)}
                                required
                            >
                                <option value="">Select an activity</option>
                                <option value="walking">Walking</option>
                                <option value="running">Running</option>
                                <option value="cycling">Cycling</option>
                                <option value="cardio">Cardio</option>
                            </select>
                        </div>
                        <div className="form-group duration-inputs">
                            <div className="form-group">
                                <label htmlFor="activity-type">Activity Title</label>
                                <input
                                    type="text"
                                    id="activity-title"
                                    name="activity-title"
                                    value={activityTitle}
                                    onChange={(e) => setActivityTitle(e.target.value)}
                                    required
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-description">Activity Description</label>
                                <input
                                    type="text"
                                    id="activity-description"
                                    name="activity-description"
                                    value={activityDescription}
                                    onChange={(e) => setActivityDescription(e.target.value)}
                                    required
                                >
                                </input>
                            </div>
                        </div>
                        <div className="form-group intensity-slider">
                            <label htmlFor="intensity">Intensity</label>
                            <input
                                type="range"
                                id="intensity"
                                name="intensity"
                                min="0"
                                max="10"
                                step="5"
                                value={intensity}
                                onChange={(e) => setIntensity(e.target.value)}
                            />
                            <div className="intensity-labels">
                                {Object.entries(intensityLevels).map(([value, label]) => (
                                    <span key={value}>{label}</span>
                                ))}
                            </div>
                        </div>
                        <div className="form-group duration-inputs">
                            <div className="form-group">
                                <label htmlFor="hours">Hours</label>
                                <input
                                    type="number"
                                    id="hours"
                                    name="hours"
                                    min="0"
                                    max="23"
                                    step="1"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="minutes">Minutes</label>
                                <input
                                    type="number"
                                    id="minutes"
                                    name="minutes"
                                    min="0"
                                    max="59"
                                    step="1"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group duration-inputs">
                            <div className="form-group">
                                <label htmlFor="breathRate">Breath Rate (breaths per minute)</label>
                                <input
                                    type="number"
                                    id="breathRate"
                                    name="breathRate"
                                    value={breathRate}
                                    onChange={(e) => setBreathRate(e.target.value)}
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="heartRate">Heart Rate (beats per minute)</label>
                                <input
                                    type="number"
                                    id="heartRate"
                                    name="heartRate"
                                    value={heartRate}
                                    onChange={(e) => setHeartRate(e.target.value)}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </LogModal>
        </div>

    );
};

export default DailyLogForm;
