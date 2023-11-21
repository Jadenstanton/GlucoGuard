import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import 'chart.js/auto';
import "./ActivityChart.css";

const ActivityChart = ({ activities }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    };

    useEffect(() => {
        if (Array.isArray(activities) && activities.every(activity => activity.created_at)) {
            const updatedChartData = {
                labels: activities.map(activity => {
                    try {
                        const date = parseISO(activity.created_at);
                        return format(date, 'yyyy-MM-dd');
                    } catch (error) {
                        console.error('Error parsing date:', activity.created_at, error);
                        return 'Invalid date';
                    }
                }),
                datasets: [
                    {
                        label: 'Activity Duration',
                        data: activities.map(activity => ({
                            x: format(parseISO(activity.created_at), 'yyyy-MM-dd'),
                            y: activity.duration
                        })),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        pointRadius: 5,
                        pointBorderWidth: 2
                    },
                ]
            };
            setChartData(updatedChartData);
        } else {
            console.error("Activities array is not valid:", activities);
        }
    }, [activities]);


    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Duration (minutes)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        maintainAspectRatio: false
    };
    // console.log(chartData)

    return (
        <div className="chart">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ActivityChart;
