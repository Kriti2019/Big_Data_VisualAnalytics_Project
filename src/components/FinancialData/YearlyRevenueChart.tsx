import React from 'react';
// import { Line } from 'react-chartjs-2';
import revenues from './Data/Yearly_Revenues.json';
import {Area, AreaChart, Tooltip, XAxis, YAxis} from 'recharts';
// import {Line} from "recharts";

const YearlyRevenueChart = () => {

  // console.log(revenues)

  const data = {
    labels: revenues.map((item) => item.Year.toString()),
    datasets: [
      {
        label: 'Indigo',
        data: revenues.map((item) => item.Indigo),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'SpiceJet',
        data: revenues.map((item) => item.SpiceJet),
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  };

  // console.log(data)


  return (
      <AreaChart width={730} height={250} data={data}
                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        {/*<CardTitlertesianGrid strokeDasharray="3 3" />*/}
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
  );
};

export default YearlyRevenueChart;
