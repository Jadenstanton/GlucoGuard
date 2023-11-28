import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const HealthMetrics = ({ activityEvaluation }) => {
    const getColor = (riskLevel) => {
        switch (riskLevel) {
            case 'low':
                return 'rgba(75, 192, 192, 0.2)'; // Green
            case 'medium':
                return 'rgba(255, 206, 86, 0.2)'; // Yellow
            case 'high':
                return 'rgba(255, 99, 132, 0.2)'; // Red
            default:
                return 'rgba(201, 203, 207, 0.2)'; // Gray for undefined risk levels
        }
    };

    // Data for the Doughnut chart
    const data = {
        labels: ['Active Zone', 'Breathing Rate', 'Heart Rate'],
        datasets: [
            {
                label: 'Health Risk',
                data: [33, 33, 34],
                backgroundColor: [
                    getColor(activityEvaluation.activeZone.level),
                    getColor(activityEvaluation.breathingRate.level),
                    getColor(activityEvaluation.heartRate.level),
                ],
                borderColor: [
                    getColor(activityEvaluation.activeZone.level).replace('0.2', '1'),
                    getColor(activityEvaluation.breathingRate.level).replace('0.2', '1'),
                    getColor(activityEvaluation.heartRate.level).replace('0.2', '1'),
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the Doughnut chart
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        cutout: '60%',
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 10,
                    padding: 10,
                    font: { size: 12 },
                },
            },
            title: {
                display: true,
                text: 'Health Risk Evaluation',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const labelIndex = context.dataIndex;
                        const labelName = context.chart.data.labels[labelIndex];
                        let labelValue;
                        switch (labelIndex) {
                            case 0:
                                labelValue = activityEvaluation.activeZone.average.toFixed(2);
                                break;
                            case 1:
                                labelValue = activityEvaluation.breathingRate.average.toFixed(2);
                                break;
                            case 2:
                                labelValue = activityEvaluation.heartRate.average.toFixed(2);
                                break;
                            default:
                                labelValue = 'N/A';
                        }
                        return `${labelName}: ${labelValue}`;
                    }
                }
            }
        },
    };

    return (
        <div className="health-summary" style={{ width: '300px', height: '300px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default HealthMetrics;
