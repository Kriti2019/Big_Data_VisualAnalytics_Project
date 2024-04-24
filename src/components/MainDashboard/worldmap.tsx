import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import data from './2.6.2_output.json';
import {Button} from "~/components/ui/button.tsx"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"


const WorldMap = () => {
    const [frames, setFrames] = useState<{
        data: {
            z: string;
            locations: string;
            text: string;
        }[];
        name: number;
    }[]
    >([]);
    const [sliderSteps, setSliderSteps] = useState<{
        label: string;
        method: string;
        args: (number[] |
            {
                mode: string;
                transition: {
                    duration: number;
                };
                frame: {
                    duration: number;
                };
            })[];
    }>([]);

    useEffect(() => {
        // Set the JSON data to the state
        processData();
    }, []);


    const processData = () => {
        const filterAndUnpack = (data, key, year) => {
            return data.filter(d => parseInt(d.Year) === year).map(d => d[key]);
        };

        const framesData = [];
        const sliderStepsData = []

        let num = 2016;
        for (let i = 0; i <= 5; i++) {
            const z = filterAndUnpack(data, 'Arrival', num);
            const locations = filterAndUnpack(data, 'iso_alpha', num);
            framesData[i] = {
                data: [{z: z, locations: locations, text: locations}],
                name: num
            };
            sliderStepsData.push({
                label: num.toString(),
                method: "animate",
                args: [[num], {
                    mode: "immediate",
                    transition: {duration: 300},
                    frame: {duration: 300}
                }]
            })

            num = num + 1
        }
        setFrames(framesData)
        setSliderSteps(sliderStepsData)
    }


    return (
        // <ResponsiveContainer width="100%" height={350}>
            <Plot
                data={[
                    {
                        type: 'choropleth',
                        locationmode: 'ISO-3',
                        locations: frames[0]?.data[0]?.locations || [],
                        z: frames[0]?.data[0]?.z || [],
                        text: frames[0]?.data[0]?.locations || [],
                        zauto: false,
                        zmin: 30,
                        zmax: 90,
                    },
                ]}
                layout={{
                    width: 1500, // Set the width of the chart
                    height: 600, // Set the height of the chart
                    // title: 'Trend in Tourism',
                    plot_bgcolor: 'transparent', // Set plot background color to transparent
                    paper_bgcolor: 'transparent', // Set paper (canvas) background color to transparent
                    geo: {
                        scope: 'world',
                        countrycolor: 'rgb(255, 255, 255)',
                        showland: true,
                        landcolor: 'rgb(217, 217, 217)',
                        showlakes: true,
                        lakecolor: 'rgb(255, 255, 255)',
                        subunitcolor: 'rgb(255, 255, 255)',
                        lonaxis: {},
                        lataxis: {},
                    },
                    updatemenus: [
                        {
                            x: 0.1,
                            y: 0,
                            yanchor: 'top',
                            xanchor: 'right',
                            showactive: false,
                            direction: 'left',
                            type: 'buttons',
                            pad: {t: 87, r: 10},
                            buttons: [
                                {
                                    method: 'animate',
                                    args: [null, {
                                        fromcurrent: true,
                                        transition: {
                                            duration: 200,
                                        },
                                        frame: {
                                            duration: 500,
                                        },
                                    }],
                                    label: 'Play',
                                },
                                {
                                    method: 'animate',
                                    args: [
                                        [null],
                                        {
                                            mode: 'immediate',
                                            transition: {
                                                duration: 0,
                                            },
                                            frame: {
                                                duration: 0,
                                            },
                                        },
                                    ],
                                    label: 'Pause',
                                },
                            ],
                        },
                    ],
                    sliders: [
                        {
                            active: 0,
                            steps: sliderSteps,
                            x: 0.1,
                            len: 0.9,
                            xanchor: 'left',
                            y: 0,
                            yanchor: 'top',
                            pad: {t: 0, b: 20},
                            currentvalue: {
                                visible: true,
                                prefix: 'Year:',
                                xanchor: 'right',
                                font: {
                                    size: 10,
                                    color: '#666',
                                },
                            },
                            transition: {
                                duration: 300,
                                easing: 'cubic-in-out',
                            },
                        },
                    ],
                }}
                config={{displayModeBar: false}}
                style={{width: '100%', height: '100%'}}
                frames={frames}
            />
        // </ResponsiveContainer>
    );
};

export default WorldMap;