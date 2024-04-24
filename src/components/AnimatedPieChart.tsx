import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import masterData from './master_data.json'; // Make sure the data is imported correctly

const AnimatedPieChart = () => {
    const [chartFrames, setChartFrames] = useState([]); // Renamed to chartFrames to avoid conflicts
    const [chartSliderSteps, setChartSliderSteps] = useState([]);

    useEffect(() => {
        processData(masterData);
    }, []);

    const processData = (data) => {
        const framesData = [];
        const sliderStepsData = [];

        const uniqueYears = [...new Set(data.map(d => d.year))];

        uniqueYears.forEach((year) => {
            const yearData = data.filter(d => d.year === year);
            const values = yearData.flatMap(d => d.data.map(item => item.value));
            const labels = yearData.flatMap(d => d.data.map(item => item.category));

            framesData.push({
                data: [{values, labels, type: 'pie'}],
                name: year.toString()
            });

            sliderStepsData.push({
                label: year.toString(),
                method: 'animate',
                args: [[year], {
                    mode: 'immediate',
                    transition: {duration: 300},
                    frame: {duration: 300}
                }]
            });
        });

        setChartFrames(framesData);
        setChartSliderSteps(sliderStepsData);
    };

    return (
        <div style={{width: '100%', height: '600px'}}>
            <Plot
                data={[
                    {
                        values: chartFrames[0]?.data[0]?.values || [],
                        labels: chartFrames[0]?.data[0]?.labels || [],
                        type: 'pie',
                    },
                ]}
                layout={{
                    title: 'Animated Pie Chart',
                    updatemenus: [{
                        buttons: [{
                            label: 'Play',
                            method: 'animate',
                            args: [null, {frame: {duration: 500, redraw: true}, mode: 'immediate'}]
                        }, {
                            label: 'Pause',
                            method: 'animate',
                            args: [[null], {mode: 'immediate', frame: {duration: 0}}]
                        }]
                    }],
                    sliders: [{
                        steps: chartSliderSteps,
                        transition: {duration: 300}
                    }]
                }}
                frames={chartFrames}
                config={{displayModeBar: false}}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
};

export default AnimatedPieChart;
