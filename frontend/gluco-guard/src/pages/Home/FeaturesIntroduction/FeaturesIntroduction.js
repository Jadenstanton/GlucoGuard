import React from 'react';
import './FeaturesIntroduction.css'; 

const FeaturesIntroduction = () => {
  return (
    <section className="features-intro">
      <h2>Discover Our Features</h2>
      
      <div className="feature" id="activity-tracking">
        <h3>Activity Tracking</h3>
        <p>Showcase how users can track their physical activity through intuitive interfaces and detailed reports.</p>
      </div>
      
      <div className="feature" id="diet-monitoring">
        <h3>Diet Monitoring</h3>
        <p>Explain how users can log their meals, track their calorie intake, and get nutritional insights to stay healthy.</p>
      </div>
      
      <div className="feature" id="health-dashboard">
        <h3>Health Dashboard</h3>
        <p>Preview the personalized dashboard where users can view all their health data, trends, and progress at a glance.</p>
      </div>
      
      <div className="feature" id="risk-assessment">
        <h3>Risk Assessment</h3>
        <p>Briefly describe the innovative diabetes prediction feature, its algorithmic foundation, and its benefits for proactive health management.</p>
      </div>
      
    </section>
  );
};

export default FeaturesIntroduction;
