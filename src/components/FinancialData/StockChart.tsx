import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

import IndigoData from './Data/CS661Stockdata_processed.json'; // Import JSON data directly
import ChaletData from './Data/CHALET.NS_Stock_Data.json'; // Import JSON data directly
import EIHDATA from './Data/EIHOTEL.NS_Stock_Data.json'; // Import JSON data directly
import INDHOTEL from './Data/INDHOTEL.NS_Stock_Data.json'; // Import JSON data directly
import LEMONTREE from './Data/LEMONTREE.NS_Stock_Data.json'; // Import JSON data directly
import SPICEJET from './Data/SPICEJET.NS_Stock_Data.json'; // Import JSON data directly
import TAJGVK from './Data/TAJGVK.NS_Stock_Data.json'; // Import JSON data directly

import {Button} from "~/components/ui/button.tsx";
import {CardHeader, CardTitle, CardContent} from "~/components/ui/card.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select.tsx";


const StockChart: React.FC = () => {

    // const StockKey = {
    //     IndigoData
    // }

    const [selectCompany, setSelectedCompany] = useState('EIHOTEL');
    const company = ['INDIGO', 'CHALET', 'LEMONTREE', 'INDHOTEL', 'SPICEJET', 'EIHOTEL', 'TAJGVK']
    const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'quarterly' | 'yearly'>('daily');
    const [plotData, setPlotData] = useState(EIHDATA); // Set initial data to daily
    const [data, setData] = useState(EIHDATA.daily);
    // const [plotData1, setPlotData1] = useState(EIHDATA); // Set initial data to daily


    useEffect(() => {
        // Update plot data when timeframe changes
        console.log('INSIDE')
        // console.log(plotData1)
        setData(plotData[timeframe]);
    }, [timeframe]);


    const getPlotlyData = () => {
        console.log(plotData, 'plotData')
        console.log(data, 'data')
        console.log(`${selectCompany}.NS_close`)
        return [{
            x: data.map(d => d.Date),
            close: data.map(d => d[`${selectCompany}.NS_close`]),
            high: data.map(d => d[`${selectCompany}.NS_high`]),
            low: data.map(d => d[`${selectCompany}.NS_low`]),
            open: data.map(d => d[`${selectCompany}.NS_open`]),
            // Set the colors for increasing and decreasing
            increasing: {line: {color: 'green'}},
            decreasing: {line: {color: 'red'}},
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
        }];
    };

    // const d = getPlotlyData()
    // console.log(d, 'd')

    const layout = {
        title: 'Candle Stick Chart for INDIGO',
        xaxis: {
            title: 'Date',
            type: 'date'
        },
        yaxis: {
            title: 'Price'
        },
        plot_bgcolor: 'transparent', // Set plot background color to transparent
        paper_bgcolor: 'transparent', // Set paper (canvas) background color to transparent
    };

    const handleSelect = (e) => {
        console.log(e)
        setSelectedCompany(e);
        // if (e === 'CHALET') {
        //     setPlotData(ChaletData.daily)
        //     // setPlotData1(ChaletData.daily)
        // }
        if (e === 'INDIGO') {
            setPlotData(IndigoData)
            setData(IndigoData.daily)
            // setPlotData1(IndigoData.daily)
        }
        // if (e === 'LEMONTREE') {
        //     setPlotData(LEMONTREE.daily)
        //     // setPlotData1(LEMONTREE.daily)
        // }
        if (e === 'INDHOTEL') {
            setPlotData(INDHOTEL)
            setData(INDHOTEL.daily)
            // setPlotData1(INDHOTEL.daily)
        }
        if (e === 'SPICEJET') {
            setPlotData(SPICEJET)
            setData(SPICEJET.daily)
            // setPlotData1(SPICEJET.daily)
        }
        if (e === 'EIHHOTEL') {
            setPlotData(EIHDATA)
            setData(EIHDATA.daily)
            // setPlotData1(EIHDATA.daily)
        }
        if (e === 'TAJGVK') {
            setPlotData(TAJGVK)
            setData(TAJGVK.daily)
            // setPlotData1(TAJGVK.daily)
        }
    }



    return (
        <>
            <CardHeader className="px-7">
                <CardTitle>Trend In Stock Market Analysis</CardTitle>
                <br/>
                <Select onValueChange={handleSelect}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Company"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Months</SelectLabel>
                            {company.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div style={{position: 'relative', paddingTop: '50px'}}>
                    <div style={{position: 'absolute', top: '10px', left: '10px', zIndex: 10}}>
                        <Button onClick={() => setTimeframe('daily')} style={{marginRight: '5px'}}>Daily</Button>
                        <Button onClick={() => setTimeframe('monthly')} style={{marginRight: '5px'}}>Monthly</Button>
                        <Button onClick={() => setTimeframe('quarterly')}
                                style={{marginRight: '5px'}}>Quarterly</Button>
                        <Button onClick={() => setTimeframe('yearly')} style={{marginRight: '5px'}}>Yearly</Button>
                    </div>
                    <Plot
                        data={getPlotlyData()}
                        layout={layout}
                        style={{width: '100%', height: '100%'}}
                    />
                </div>
            </CardContent>
        </>
    )
        ;
};

export default StockChart;
