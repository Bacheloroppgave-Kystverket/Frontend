import React, { useEffect } from 'react';
import {Bar, Chart} from 'react-chartjs-2';


export default function DoubleGraph({dataAsArray, currentMetric}) {

    let colorArray = ["#0263FF","#25FF02"]
    function makeDataSets(dataAsArray){
        let datasets = [];
        let labels = [];
        for(let i = 0; i < dataAsArray.length; i++){
            let name = dataAsArray[i].keys().next().value;
            let map = dataAsArray[i].get(name)[currentMetric];
            let localLabels = getKeysOfMapAsArary(map.keys());
            let data = getKeysOfMapAsArary(map.values())
            datasets.push(makeDataset(data, name, i));
            console.log(dataAsArray[i]);
        }
        console.log(datasets)
        return datasets;
    }

    function makeDataset(data, labelName, count){
        return {
            label: labelName,
            data: data,
            barPercentage: 0.35,
            backgroundColor: colorArray[count],
        };
    }

    /**
   * Gets the keys or values of a map and turns it into an array.
   * @param {map} iterator the iterator of the map.
   * @returns the map as an array.
   */
  function getKeysOfMapAsArary(iterator) {
    var array = [];
    for (var value of iterator) {
      array.push(value);
    }
    return array;
  }

    return (
        <div className='App'>
            <div style={{maxWidth: "650px"}}>
                <Bar
                data={{
                    labels: ["Outside", "ECDIS", "Radar"],
                    datasets: makeDataSets(dataAsArray),
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
                        datalabels: {
                            anchor: "end",
                            align: "top",
                            formatter: Math.round,
                          },
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true
                            }, 
                        }
                    }
                }}
                
                />
            </div>
        </div>
    )

}

