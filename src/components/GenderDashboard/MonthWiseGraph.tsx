import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card.tsx"
import data from "~/components/GenderDashboard/Data/output1.json";

import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const BarGraphFTA = (month: string) => {
    // Extracting the data for the specified year and formatting for the chart

    const updatedData = Object.keys(data[month.month]).map(item => {
        return {
            year: item,
            value: data[month.month][item]
        }

    })

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={updatedData}>
                <XAxis
                    dataKey="year"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar
                    dataKey="value"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
                <Tooltip
                    content={({active, payload}) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              FTA
                            </span>
                                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return null
                    }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};


export function MonthWiseGraph() {

    const [monthSelected, setmonthSelected] = React.useState<string>('April')
    const months = Object.keys(data)
    const handleSelect = (e) => {
        setmonthSelected(e)
    }

    return (
        <Card className="" x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>FTA travel to India</CardTitle>
                <CardDescription>
                    <br/>
                    <Select onValueChange={handleSelect} defaultValue={'April'}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Month"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Months</SelectLabel>
                                { months.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardContent className="p-6 text-sm">
                    <BarGraphFTA month={monthSelected}/>
                </CardContent>
            </CardContent>
        </Card>


    )
}