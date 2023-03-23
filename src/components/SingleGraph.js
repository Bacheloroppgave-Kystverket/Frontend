import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import "chartjs-plugin-datalabels";

export default function SingleGraph({ session }) {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/session/8")
      .then((res) => res.json())
      .then((result) => {
        setSessions(result);
      });
  }, []);
  if (sessions != null) {
    console.log(sessions.simulationSetup);
  }


  return (
    <div className="App">
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: [{}, "ECDIS", "Radar", "Connig"],
            datasets: [
              {
                // Data or value of your each variable
                data: [72, 9, 6.3, 2.7],
                barPercentage: 0.35,
                // Color of each bar
                backgroundColor: ["#0263FF", "#FF7723", "#8E30FF", "#530B27"],
              },
            ],
          }}
          // Height of graph
          height={450}
          width={408}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  offset: true,
                },
                border: {
                  dash: [2, 4],
                },
              },
              y: {
                ticks: {
                  maxTicksLimit: 7,
                },
                border: {
                  dash: [2, 4],
                },
              },
            },
            plugins: {
              datalabels: {
                display: true,
                anchor: "end",
                align: "top",
                formatter: Math.round,
                offset: -20,
              },
            },
            legend: {
              display: false,
              position: "top",
              labels: {
                usePointStyle: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
