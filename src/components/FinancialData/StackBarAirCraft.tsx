import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import data from './Data/Yearly_Revenues.json';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select.tsx";

const StackBarAirCraft: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<string>('');

    const CompanyName = ['Indigo', "SpiceJet"]

    const handleSelect = (e) => {
        setSelectedCompany(e);
    };

    const filteredData = data.map((yearData: any) => ({
        Year: yearData.Year,
        Revenue: yearData[selectedCompany]
    }));

    return (
        <div>
            <Select onValueChange={handleSelect} defaultValue={''}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Company</SelectLabel>
                        {CompanyName.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <BarChart
                width={600}
                height={400}
                data={filteredData.reverse()}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <XAxis dataKey="Year"
                       stroke="#888888"
                       fontSize={12}
                       tickLine={false}
                       axisLine={false}/>
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}/>
                <Tooltip
                    content={({active, payload}) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Revenue
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
                <Legend />
                <Bar
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                    dataKey="Revenue"
                />
            </BarChart>
        </div>
    );
};

export default StackBarAirCraft;
