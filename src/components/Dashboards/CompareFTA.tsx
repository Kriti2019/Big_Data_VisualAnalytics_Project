import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "~/components/ui/breadcrumb.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card.tsx"
import {Link, useNavigate} from "react-router-dom";
import data from "~/components/GenderDashboard/Data/output8_updated.json";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select.tsx";
import React from "react";
import {LineGraphComponent} from "~/components/GenderDashboard/GenderBarGraph.tsx";
import {AgeGraph} from "~/components/GenderDashboard/AgeGroupGraphs.tsx";
import {PurposeOfVisit} from "~/components/GenderDashboard/PurposeOfVisit.tsx";

export function CompareDashboardFTA() {

    const navigate = useNavigate();

    const [countrySelected, setCountrySelected] = React.useState<string>("UNITED STATES OF AMERICA");
    const [countrySelected2, setCountrySelected2] = React.useState<string>("SPAIN");
    const countries = Array.from(new Set(data.map((d) => {
        return d.Country.toUpperCase()
    }))).sort();

    const handleSelect = (e) => {
        setCountrySelected(e)
    }

    const handleSelect2 = (e) => {
        setCountrySelected2(e)
    }

    // console.log(countryData);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="../exploreFta">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main
                    className="grid flex-1 items-start gap-4 p-4 grid-cols-1 sm:px-6 sm:py-0 md:gap-6 lg:grid-cols-2 xl:grid-cols-2">
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm">Select First Country</CardTitle>
                            <br/>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={handleSelect} defaultValue={countrySelected}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select first Country"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Months</SelectLabel>
                                        {countries.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm">Select Second Country</CardTitle>
                            <br/>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={handleSelect2} defaultValue={countrySelected2}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select second Country"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Months</SelectLabel>
                                        {countries.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/*Line graph of Gender*/}
                    <Card className="" x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Gender Wise Distribution of Tourists</CardTitle>
                            <CardDescription>
                                <br/>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LineGraphComponent country={countrySelected}/>
                        </CardContent>
                    </Card>

                    <Card className="" x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Gender Wise Distribution of Tourists</CardTitle>
                            <CardDescription>
                                <br/>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

                            <LineGraphComponent country={countrySelected2}/>
                        </CardContent>
                    </Card>

                    {/*Age group*/}

                    <Card className="" x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Age Wise Distribution of Tourists</CardTitle>
                            <CardDescription>
                                <br/>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AgeGraph country={countrySelected}/>
                        </CardContent>
                    </Card>

                    <Card className="" x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Age Wise Distribution of Tourists</CardTitle>
                            <CardDescription>
                                <br/>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

                            <AgeGraph country={countrySelected2}/>
                        </CardContent>
                    </Card>

                    {/*Purpose of Visit*/}

                    <Card className="" x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Purpose of visit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PurposeOfVisit country={countrySelected}/>
                        </CardContent>
                    </Card>

                    <Card className="" x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Purpose of visit</CardTitle>
                        </CardHeader>
                        <CardContent>

                            <PurposeOfVisit country={countrySelected2}/>
                        </CardContent>
                    </Card>


                </main>
            </div>
        </div>
    )
}
