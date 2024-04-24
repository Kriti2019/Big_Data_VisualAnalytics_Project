import React, {useState} from "react";
import data from "~/components/IndiaDashboard/Data/StateWiseJSON.json";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select.tsx";
import {LineGraphStateComponent} from "~/components/IndiaDashboard/IndiaStateLineGraph.tsx";
import {Pie, PieChart, Tooltip} from "recharts";
import Plot from 'react-plotly.js';
import topMonu from "~/components/Dashboards/Data/output_1.json";
import cityData from "~/components/Dashboards/Data/2021_updated_data.json"
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar.tsx";



export function StateCityMonument(state) {

    const cD = cityData.filter(d => d.state.replaceAll(" ", "").replace(/[^a-zA-Z ]/g, "").toLowerCase() === state.state.replaceAll(" ", "").replace(/[^a-zA-Z ]/g, "").toLowerCase())
    console.log(cD, 'cityData');

    let type = 'foreign';
    if (state.type == "Domestic Travel") {
        type = 'domestic'
    }

    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Over All Ranking</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {cD.map(item => {
                    return (
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                <AvatarFallback>{item.city}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.city} - {item.monument}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">{type === 'domestic' ? item.domestic : item.foreign}</div>
                        </div>
                    )
                })}

            </CardContent>
        </Card>

    );
}

function uniqueElementsByKey(array, key) {
    return Object.values(array.reduce((unique, item) => {
        if (!unique[item[key]]) {
            unique[item[key]] = item;
        }
        return unique;
    }, {}));
}
export function StateTopMonument(state) {

    const topMonuments = topMonu.filter(d => d.State.replaceAll(" ", "").replace(/[^a-zA-Z ]/g, "").toLowerCase() === state.state.replaceAll(" ", "").replace(/[^a-zA-Z ]/g, "").toLowerCase())
    // console.log(state.state.replaceAll(" ", "").replace(/[^a-zA-Z ]/g, "").toLowerCase())
    // console.log(topMonuments, 'topMonuments');

    let type = 'foreign';
    if (state.type == "Domestic Travel") {
        type = 'domestic'
    }

    const FinalData = topMonuments.filter(d => d.visitors_type === type)
    // console.log(FinalData, 'FinalData');

    const sortedData = FinalData.sort((a, b) => a['rank'] - b['rank']);

    const uniqueByName = uniqueElementsByKey(sortedData, 'name');

    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Over All Ranking</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {uniqueByName.map(item => {
                    return (
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                <AvatarFallback>{item.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.name}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">{item.visitors}</div>
                            <div className="ml-auto font-medium">{item.rank}</div>
                        </div>
                    )
                })}

            </CardContent>
        </Card>

    );
}

export function StatePieChart(state) {

    const [dataType, setDataType] = useState("Domestic Travel");
    const stateData = data.filter((d) => d["States/UTs"].toUpperCase().replaceAll(" ", "").replace(/[^a-zA-Z ]/g, "") === state.state.replaceAll(" ", "").replace(/[^a-zA-Z ]/g, ""))

    function getDataYearWise(data) {
        const result = {};
        for (const key in data) {
            if (key.includes('-')) {
                const [year, type] = key.split('-');
                if (!result[year]) {
                    result[year] = {DTV: {}, FTV: {}, year: year}
                }
                result[year][type] = parseInt(data[key]);
            }
        }
        return result;
    }

    const yearWiseData = getDataYearWise(stateData[0]);
    let yearWiseDataFinal = [];
    for (const i in yearWiseData) {
        yearWiseDataFinal.push(yearWiseData[i])
    }
    const handleClick = (e) => {
        const capitalizedString = e.points[0].label.charAt(0).toUpperCase() + e.points[0].label.slice(1);
        setDataType(capitalizedString)
    }

    let dtv = 0
    let ftv = 0
    for (var i in yearWiseData) {
        dtv += yearWiseData[i].DTV
        ftv += yearWiseData[i].FTV
    }

    return (
        <>
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>{state.stateReadData} Foreign and Domestic Travellers</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Plot
                        data={[
                            {
                                values: [dtv, ftv],
                                labels: ['Domestic Travel', 'foreign Travel'],
                                type: 'pie',
                                marker: {
                                    colors: ['#008DDA', '#874CCC'], // Custom color scheme
                                },
                            },
                        ]}
                        layout={
                            {
                                width: 500,
                                height: 340,
                                plot_bgcolor: 'transparent', // Set plot background color to transparent
                                paper_bgcolor: 'transparent', // Set paper (canvas) background color to transparent
                            }}
                        onClick={handleClick}
                    />
                </CardContent>
            </Card>
            <Card className="" x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>{state.stateReadData} { dataType.split(' ')[0] } Travellers</CardTitle>
                </CardHeader>
                <CardContent>
                    <StateTopMonument state={state.state.toUpperCase()} type={dataType}/>
                </CardContent>
            </Card>
            <Card className="" x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>{state.stateReadData} { dataType.split(' ')[0] } Travellers</CardTitle>
                </CardHeader>
                <CardContent>
                    <StateCityMonument state={state.state.toUpperCase()} type={dataType}/>
                </CardContent>
            </Card>
        </>
    )
}
