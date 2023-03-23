import React from 'react';
import {Bar, Chart} from 'react-chartjs-2';


export default function DoubleGraph() {
    return (
        <div className='App'>
            <div style={{maxWidth: "650px"}}>
                <Bar
                data={{
                    labels: ["Outside", "ECDIS", "Radar", "Connig"],
                    datasets: [
                        {
                            data: [72, 9, 6.3, 2.7], 
                            barPercentage: 0.35,
                            backgroundColor: "#0263FF"
                        },
                        {
                            data: [49, 10, 5, 4],
                            barPercentage: 0.35,
                            backgroundColor: "#25FF02"
                        }
                    ]
                }}
                height={450}
                width={408}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                offset: true
                            },
                            border: {
                                dash: [2,4]
                            },
                        },
                        y: {
                            grid: {
                                offset: true
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                            border: {
                                dash: [2,4]
                            }
                        }
                    },

                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true
                            }
                        }
                    }
                }}
                
                />
            </div>
        </div>
    )

}

