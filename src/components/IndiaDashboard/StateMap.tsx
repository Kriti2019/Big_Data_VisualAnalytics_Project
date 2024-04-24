import React from 'react';
import Plot from 'react-plotly.js';
import data from "./Data/UttarPradesh_geojson.json";
import ChoroplethMap from "~/components/IndiaDashboard/IndiaMap.tsx";

// Sample data for Uttar Pradesh (replace with actual data)
const uttarPradeshData = {
    activeCases: 15720 // Example: Number of active cases in Uttar Pradesh
};

console.log(data);
function UttarPradeshChoroplethMap() {
    return (
        <div>
            <Plot
                data={[
                    {
                        type: 'choropleth',
                        geojson: data, // Path to Uttar Pradesh's GeoJSON data
                        featureidkey: 'properties.ST_NM',
                        locations: ['Uttar Pradesh'], // Specify Uttar Pradesh as the location
                        z: [uttarPradeshData.activeCases], // Active cases data for Uttar Pradesh
                        colorscale: 'Reds',
                        zmin: 0,
                        zmax: 20000, // Adjust as needed based on your data
                        colorbar: {
                            title: 'Active Cases'
                        }
                    }
                ]}
                layout={{
                    title: 'Active Cases in Uttar Pradesh',
                    geo: {
                        scope: 'india',
                        showlakes: true,
                        lakecolor: 'rgb(255, 255, 255)'
                    }
                }}
            />
        </div>
    );
}

export default UttarPradeshChoroplethMap;