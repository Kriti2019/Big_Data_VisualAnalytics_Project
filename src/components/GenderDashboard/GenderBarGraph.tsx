import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import {useTheme} from "~/provider/theme.tsx";
import data from "~/components/GenderDashboard/Data/output5_updated.json";
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
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar.tsx";
import {Progress} from "~/components/ui/progress.tsx";

const RightComponent = (country) => {

    const countryData = data.filter((d) => d.Country.toUpperCase() === country.country.toUpperCase()).reduce((acc, item) => {
        const maleCount = (item.Male * item.Arrival) / 100;
        const femaleCount = (item.Female * item.Arrival) / 100;

        acc.totalArrival += item.Arrival;
        acc.totalMale += maleCount;
        acc.totalFemale += femaleCount;

        return acc;
    }, {totalArrival: 0, totalMale: 0, totalFemale: 0});

    // console.log(countryData);

    const finalCountryData = {
        'Total Arrival': countryData.totalArrival,
        'Male': countryData.totalMale,
        'Female': countryData.totalFemale
    }

    return (
        <> {Object.keys(finalCountryData).map((item) => {
            return (
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                        <AvatarFallback>{item[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {item}
                        </p>
                    </div>
                    <Progress value={ (finalCountryData[item].toFixed(2) / finalCountryData['Total Arrival'].toFixed(2)) * 100 } />
                    <div className="ml-auto font-medium">{finalCountryData[item].toFixed(2)}</div>
                </div>
            )
        })}

        </>
    )

}

export function LineGraphComponent(country) {
    // Extracting the data for the specified year and formatting for the chart

    const {theme: mode} = useTheme()
    // const [config] = useConfig()
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

    const countryData = data.filter((d) => d.Country.toUpperCase() === country.country).map((item) => {
        return {
            year: item.Year,
            Arrival: item.Arrival,
            Male: item.Male,
            Female: item.Female,
        }
    })

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart width={730} height={250} data={countryData.reverse()}
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
                              Male
                            </span>
                                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                                        </div>
                                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Female
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
                <Legend />
                <Line
                    type="monotone"
                    strokeWidth={2}
                    stroke='#008DDA'
                    dataKey="Male"
                    activeDot={{
                        r: 6,
                        style: {fill: "var(--theme-primary)", opacity: 0.55},
                    }}
                    style={
                        {
                            opacity: 0.55,
                            "--theme-primary": `hsl(${
                                theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                            })`,
                        } as React.CSSProperties
                    }
                />
                <Line
                    type="monotone"
                    dataKey="Female"
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


export function GenderWiseGraph() {

    const [countrySelected, setCountrySelected] = React.useState<string>("UNITED STATES OF AMERICA");
    const countries = Array.from(new Set(data.map((d) => {
        return d.Country.toUpperCase()
    }))).sort();
    const handleSelect = (e) => {
        setCountrySelected(e)
    }

    return (
        <>
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <Card className="" x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Gender Wise Distribution of Tourists</CardTitle>
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
                            <LineGraphComponent country={countrySelected}/>
                        </CardContent>
                    </CardContent>
                </Card>
            </Card>

            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>OverView</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    <RightComponent country={countrySelected}/>
                </CardContent>
            </Card>
        </>
    )
}
