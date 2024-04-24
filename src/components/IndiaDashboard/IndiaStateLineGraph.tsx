import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import {useTheme} from "~/provider/theme.tsx";
import data from './Data/StateWiseJSON.json';
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

export function LineGraphStateComponent(state) {
    // Extracting the data for the specified year and formatting for the chart

    const {theme: mode} = useTheme()

    const theme = {
        name: "zinc",
        label: "Zinc",
        activeColor: {
            light: "240 5.9% 10%",
            dark: "240 5.2% 33.9%",
        },
        cssVars: {
            light: {
                background: "0 0% 100%",
                foreground: "240 10% 3.9%",
                card: "0 0% 100%",
                "card-foreground": "240 10% 3.9%",
                popover: "0 0% 100%",
                "popover-foreground": "240 10% 3.9%",
                primary: "24.6 95% 53.1%;",
                "primary-foreground": "0 0% 98%",
                secondary: "240 4.8% 95.9%",
                "secondary-foreground": "240 5.9% 10%",
                muted: "240 4.8% 95.9%",
                "muted-foreground": "240 3.8% 46.1%",
                accent: "240 4.8% 95.9%",
                "accent-foreground": "240 5.9% 10%",
                destructive: "0 84.2% 60.2%",
                "destructive-foreground": "0 0% 98%",
                border: "240 5.9% 90%",
                input: "240 5.9% 90%",
                ring: "240 5.9% 10%",
                radius: "0.5rem",
            },
            dark: {
                background: "240 10% 3.9%",
                foreground: "0 0% 98%",
                card: "240 10% 3.9%",
                "card-foreground": "0 0% 98%",
                popover: "240 10% 3.9%",
                "popover-foreground": "0 0% 98%",
                primary: "20.5 90.2% 48.2%",
                "primary-foreground": "240 5.9% 10%",
                secondary: "240 3.7% 15.9%",
                "secondary-foreground": "0 0% 98%",
                muted: "240 3.7% 15.9%",
                "muted-foreground": "240 5% 64.9%",
                accent: "240 3.7% 15.9%",
                "accent-foreground": "0 0% 98%",
                destructive: "0 62.8% 30.6%",
                "destructive-foreground": "0 0% 98%",
                border: "240 3.7% 15.9%",
                input: "240 3.7% 15.9%",
                ring: "240 4.9% 83.9%",
            },
        },
    }

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

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart width={730} height={250} data={yearWiseDataFinal}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="year"/>
                <YAxis/>
                <Tooltip
                    content={({active, payload}) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              DTV
                            </span>
                                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                                        </div>
                                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              FTV
                            </span>
                                            <span className="font-bold">
                              {payload[1].value}
                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return null
                    }}
                />
                <Legend/>
                <Line
                    type="monotone"
                    strokeWidth={2}
                    stroke='#008DDA'
                    dataKey="DTV"
                    activeDot={{
                        r: 6,
                        style: {fill: "var(--theme-primary)", opacity: 0.25},
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="FTV"
                    strokeWidth={2}
                    stroke='#874CCC'
                    activeDot={{
                        r: 8,
                        style: {fill: "var(--theme-primary)"},
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};


export function StateWiseGraph() {

    const [stateSelected, setStateSelected] = React.useState<string>("UTTAR PRADESH");
    const states = Array.from(new Set(data.map((d) => {
        return d["States/UTs"].toUpperCase()
    }))).sort();
    const handleSelect = (e) => {
        setStateSelected(e)
    }

    return (
        <>
            <CardHeader className="px-7">
                <CardTitle></CardTitle>
                <CardDescription>
                    <Select onValueChange={handleSelect} defaultValue={stateSelected}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Country"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Months</SelectLabel>
                                {states.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardContent className="p-6 text-sm">
                    <LineGraphStateComponent state={stateSelected}/>
                </CardContent>
            </CardContent>
        </>
    )
}