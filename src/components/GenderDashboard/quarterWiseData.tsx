import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar.tsx";
import React from "react";
import data from "~/components/GenderDashboard/Data/output1.json";
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
import { Progress } from "~/components/ui/progress"


export function QuarterWiseData() {

    const [yearSelected, setYearSelected] = React.useState<string>('2005')
    // const [total, settotal] = React.useState<string>('0')
    let total = 0

    const years = Object.keys(data["January"])

    let q1: number = 0
    let q2: number = 0
    let q3: number = 0
    let q4: number = 0

    for (const property in data) {
        if (["January", "February", "March"].includes(property)) {
            q1 += data[property][yearSelected]
        }
        if (["April", "May", "June"].includes(property)) {
            q2 += data[property][yearSelected]
        }
        if (["July", "August", "September"].includes(property)) {
            q3 += data[property][yearSelected]
        }
        if (["October", "November", "December"].includes(property)) {
            q4 += data[property][yearSelected]
        }
    }

    let finalData = [
        {
            name: "Q1",
            target: 1,
            value: q1
        },
        {
            name: "Q2",
            target: 2,
            value: q2
        },
        {
            name: "Q3",
            target: 3,
            value: q3
        },
        {
            name: "Q4",
            target: 4,
            value: q4
        }
    ]

    total = q1+q2+q3+q4

    const updateData = () => {
        let q1: number = 0
        let q2: number = 0
        let q3: number = 0
        let q4: number = 0

        for (const property in data) {
            if (["January", "February", "March"].includes(property)) {
                q1 += data[property][yearSelected]
            }
            if (["April", "May", "June"].includes(property)) {
                q2 += data[property][yearSelected]
            }
            if (["July", "August", "September"].includes(property)) {
                q3 += data[property][yearSelected]
            }
            if (["October", "November", "December"].includes(property)) {
                q4 += data[property][yearSelected]
            }
        }
        total = q1+q2+q3+q4

        return [
            {
                name: "Q1",
                target: 1,
                value: q1
            },
            {
                name: "Q2",
                target: 2,
                value: q2
            },
            {
                name: "Q3",
                target: 3,
                value: q3
            },
            {
                name: "Q4",
                target: 4,
                value: q4
            }
        ]
    }

    const handleSelect = (e) => {
        setYearSelected(e)
        updateData()

    }

    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                        <br/>
                        <Select onValueChange={handleSelect} defaultValue={'2005'}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Year"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Years</SelectLabel>
                                    {years.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {finalData.map(item => {
                        return (
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                    <AvatarFallback>{item.target}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item.name}
                                    </p>
                                </div>
                                <Progress value={(item.value/total)*100}/>
                                <div className="ml-auto font-medium">{item.value}</div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

        </>
    )
}