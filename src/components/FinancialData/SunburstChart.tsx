import React from 'react';
import Plot from 'react-plotly.js';
import rawData from './Data/sunburst1.json'; // Ensure the path to your JSON data is correct

const SunburstChart: React.FC = () => {
  const processData = (data) => {
    // Create fixed quarter nodes
    const hierarchy = [
      { ids: 'Q1', labels: 'Q1', parents: '' },
      { ids: 'Q2', labels: 'Q2', parents: '' },
      { ids: 'Q3', labels: 'Q3', parents: '' },
      { ids: 'Q4', labels: 'Q4', parents: '' },
    ];

    // Map through the data to create year-quarter nodes and company nodes
    const quarterMap = { 'q1': 'Q1', 'q2': 'Q2', 'q3': 'Q3', 'q4': 'Q4' };
    data.forEach(d => {
      const quarterId = quarterMap[d.Quarter];
      const yearQuarterId = `${quarterId}-${d.Year}`;
      const companyId = `${yearQuarterId}-${d.Company}`;

      // Add year-quarter nodes if they don't already exist
      if (!hierarchy.find(node => node.ids === yearQuarterId)) {
        hierarchy.push({
          ids: yearQuarterId,
          labels: d.Year.toString(),
          parents: quarterId,
        });
      }

      // Add company nodes
      hierarchy.push({
        ids: companyId,
        labels: d.Company,
        parents: yearQuarterId,
        value: d.Revenue,
      });
    });

    return hierarchy;
  };

  const transformedData = processData(rawData);

  const chartData = [
    {
      type: 'sunburst',
      ids: transformedData.map(d => d.ids),
      labels: transformedData.map(d => d.labels),
      parents: transformedData.map(d => d.parents),
      values: transformedData.map(d => d.value),
      branchvalues: 'total', // This will consider the value as the total of itself and all its children
      outsidetextfont: { size: 20, color: '#377eb8' },
      leaf: { opacity: 0.4 },
      marker: { line: { width: 2 } },
    }
  ];

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    sunburstcolorway: ['#636efa', '#ef553b', '#00cc96'],
  };

  return (
    <Plot
      data={chartData}
      layout={layout}
    />
  );
};

export default SunburstChart;




