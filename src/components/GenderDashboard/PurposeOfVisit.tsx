import React from 'react';
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    BarChart, Bar, Tooltip
} from 'recharts';
import data from "~/components/GenderDashboard/Data/output8_updated.json";
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

export function PurposeOfVisit(country) {
    // Extracting the data for the specified year and formatting for the chart

    const countryData = data.filter((d) => d.Country.toUpperCase() === country.country).map(item => {
        console.log('Item', item)
        return {
            "Year": item.Year,
            "BusinessandProfessional": item.BusinessandProfessional,
            "LeisureHolidayandRecreation": item.LeisureHolidayandRecreation,
            "Medical": item.Medical,
            "IndianDiaspora": item.IndianDiaspora,
            "Others": item.Others

        }
    })


    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart width={500} height={500} data={countryData.reverse()}>
                <XAxis
                    dataKey="Year"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}/>
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip cursor={{fill: 'currentColor'}}/>
                <Bar dataKey="BusinessandProfessional" stackId="a" fill="#FF5B22" radius={[4, 4, 0, 0]}
                     className="#FF5B22"/>
                <Bar dataKey="LeisureHolidayandRecreation" stackId="a" fill="#FF9130" radius={[4, 4, 0, 0]}
                     className="#FF9130"/>
                <Bar dataKey="Medical" stackId="a" fill="#153448" radius={[4, 4, 0, 0]} className="#153448"/>
                <Bar dataKey="IndianDiaspora" stackId="a" fill="#9BCF53" radius={[4, 4, 0, 0]}
                     className="#9BCF53"/>
                <Bar dataKey="Others" stackId="a" fill="#FDBF60" radius={[4, 4, 0, 0]} className="#FDBF60"/>
            </BarChart>
        </ResponsiveContainer>
    );
};


export function PurposeOfVisitGraph() {

    const [countrySelected, setCountrySelected] = React.useState<string>("UNITED STATES OF AMERICA");
    const countries = Array.from(new Set(data.map((d) => {
        return d.Country.toUpperCase()
    }))).sort();

    const handleSelect = (e) => {
        setCountrySelected(e)
    }

    return (
        <Card className="" x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Purpose of the Visits of Tourists</CardTitle>
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
                    <PurposeOfVisit country={countrySelected}/>
                </CardContent>
            </CardContent>
        </Card>
    )
}

// export default LineGraphComponent;