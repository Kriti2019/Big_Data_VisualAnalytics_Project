import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import data from './Data/StateWiseJSON.json';
import {useNavigate} from "react-router-dom";

function ChoroplethMap() {

    const navigate = useNavigate()

    let states = [];
    let values = [];

    const Data = data.map((item)=> {

        let value = 0
        Object.keys(item).map(i => {
            if (i !== 'States/UTs' && i !== 'Sl. No.' ) {
                value += parseInt(item[i])
            }
        })
        states.push(item["States/UTs"]);
        values.push(value);
    })


    const handleSelect = (e) => {
        console.log(e)
        console.log(e.points[0].location.replace(' ', '').toLowerCase())
        navigate(`../state/${e.points[0].location.replace(' ', '').toLowerCase()}`)
    }

    return (
        <div>
            <Plot
                data={[
                    {
                        type: 'choropleth',
                        geojson:
                            'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson',
                        featureidkey: 'properties.ST_NM',
                        locations: states,
                        z: values,
                        colorscale: 'Reds',
                        zmin: 0,
                        zmax: Math.max(...values),
                        animation: {
                            duration: 1000,
                            redraw: true,
                        },
                    },
                ]}
                layout={{
                    width: 1500, // Set the width of the chart
                    height: 600, // Set the height of the chart
                    // title: 'Trend in Tourism',
                    plot_bgcolor: 'transparent', // Set plot background color to transparent
                    paper_bgcolor: 'transparent', // Set paper (canvas) background color to transparent
                    geo: {
                        fitbounds: 'locations',
                        visible: false,
                    },
                }}
                onClick={handleSelect}
            />
        </div>
    );
}

export default ChoroplethMap;