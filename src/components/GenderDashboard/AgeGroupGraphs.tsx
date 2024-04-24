import React, {useState} from 'react';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis, Radar, PolarRadiusAxis, Legend, RadialBarChart, RadialBar, Tooltip
} from 'recharts';
import data from "~/components/GenderDashboard/Data/output6_updated.json";
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

// interface AgeGroupData {
//     ageGroup: string;
//     [year: string]: number | string;
// }
export function AgeYearWiseRadialGraphSelect(state) {
    // Extracting the data for the specified year and formatting for the chart

    const countryData = data.filter((d) => d.Country.toUpperCase() === state.country)

    const years = countryData.map((d) => d.Year)
    console.log('country', countryData)
    console.log('years', years)

    const [selectedYear, setSelectedYear] = useState(years[0])
    const [ageData, setAgeData] = useState({})

    const handleSelect = (e) => {
        console.log(e, e)
        setSelectedYear(e)
        const filterAgeData = countryData.filter((d) => d.Year === selectedYear)
        const ageGroups = [
            {range: "0-14", name: "0-14", fill: "#8884d8"},
            {range: "15-24", name: "15-24", fill: "#83a6ed"},
            {range: "25-34", name: "25-34", fill: "#8dd1e1"},
            {range: "35-44", name: "35-44", fill: "#82ca9d"},
            {range: "45-54", name: "45-54", fill: "#a4de6c"},
            {range: "55-64", name: "55-64", fill: "#d0ed57"},
            {range: "Above", name: "Above", fill: "#ffc658"}
        ];
        console.log(filterAgeData[0], '0')
        const convertedData = ageGroups.map(group => ({
            name: group.name,
            value: filterAgeData[0][group.range],
            fill: group.fill
        }));
        setAgeData(convertedData)
    }

    console.log('transformed', ageData);

    return (
        <>
            <CardHeader className="px-7">
                <CardTitle>Age Wise Distribution Of Tourists Per Year</CardTitle>
                <br/>
                <Select onValueChange={handleSelect}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Year"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Year</SelectLabel>
                            {years.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    {Object.keys(ageData).length ?
                        <RadialBarChart
                            width={730}
                            height={250}
                            innerRadius="10%"
                            outerRadius="80%"
                            data={ageData}
                            startAngle={180}
                            endAngle={0}
                        >
                            <RadialBar minAngle={1} label={{fill: '#666', position: 'insideStart'}} background
                                       clockWise={true} dataKey='value'/>
                            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle'
                                    align="right"/>
                            <Tooltip/>
                        </RadialBarChart> :
                        <div className="flex items-center gap-4">
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Choose a Year
                                </p>
                            </div>
                        </div>
                    }
                </ResponsiveContainer>
            </CardContent>
        </>
    );
};

interface AgeGroupData {
    ageGroup: string;

    [year: string]: number | string;
}

export function AgeGraph(country) {
    // Extracting the data for the specified year and formatting for the chart

    const countryData = data.filter((d) => d.Country.toUpperCase() === country.country)

    console.log('countryData', countryData)
    const transformedData: AgeGroupData[] = Object.keys(countryData[0])
        .filter(key => key !== 'Year' && key !== 'Continent' && key !== 'Country' && key !== 'Arrival' && key !== 'iso_alpha' && key !== 'iso_num')
        .map(ageGroup => ({
            ageGroup,
            ...countryData.reduce((acc, curr) => {
                acc[curr.Year] = curr[ageGroup];
                return acc;
            }, {} as Record<string, number>)
        }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart outerRadius={90} width={730} height={250} data={transformedData}>
                <PolarGrid/>
                <PolarAngleAxis dataKey="ageGroup"/>
                <PolarRadiusAxis angle={30} domain={['auto', 'auto']}/>
                <Radar name="2016" dataKey="2016" stroke="#F28585" fill="#F28585" fillOpacity={0.6}/>
                <Radar name="2017" dataKey="2017" stroke="#96EFFF" fill="#96EFFF" fillOpacity={0.6}/>
                <Radar name="2018" dataKey="2018" stroke="#F4EAE0" fill="#F4EAE0" fillOpacity={0.6}/>
                <Radar name="2019" dataKey="2019" stroke="#B4BDFF" fill="#B4BDFF" fillOpacity={0.6}/>
                <Radar name="2020" dataKey="2020" stroke="#FDBF60" fill="#FDBF60" fillOpacity={0.6}/>
                <Radar name="2021" dataKey="2021" stroke="#FC6736" fill="#FC6736" fillOpacity={0.6}/>
                <Legend onClick={() => null}/>
            </RadarChart>
        </ResponsiveContainer>
    );
};


export function AgeGroup() {

    const [countrySelected, setCountrySelected] = React.useState<string>("UNITED STATES OF AMERICA");
    const countries = Array.from(new Set(data.map((d) => {
        return d.Country.toUpperCase()
    }))).sort();

    const handleSelect = (e) => {
        setCountrySelected(e)
    }

    return (
        <>
            <Card className="col-span-2" x-chunk="dashboard-01-chunk-4">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Age Wise Distribution of Tourists</CardTitle>
                        <CardDescription>
                            <br/>
                            <Select onValueChange={handleSelect} defaultValue={'UNITED STATES OF AMERICA'}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Country"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Months</SelectLabel>
                                        {countries.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardContent className="p-6 text-sm">
                            <AgeGraph country={countrySelected}/>
                        </CardContent>
                    </CardContent>
                </Card>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
                <AgeYearWiseRadialGraphSelect country={countrySelected}/>
            </Card>
        </>
    )
}

// export default LineGraphComponent;