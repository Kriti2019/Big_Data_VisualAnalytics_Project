import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/components/ui/avatar.tsx"
import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card.tsx"
import {Link, useNavigate} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "~/components/ui/breadcrumb.tsx";
import React from "react";
import {GenderWiseGraph} from "~/components/GenderDashboard/GenderBarGraph.tsx";
import {MonthWiseGraph} from "~/components/GenderDashboard/MonthWiseGraph.tsx";
import {QuarterWiseData} from "~/components/GenderDashboard/quarterWiseData.tsx";
import {AgeGroup} from "~/components/GenderDashboard/AgeGroupGraphs.tsx";
import {PurposeOfVisitGraph} from "~/components/GenderDashboard/PurposeOfVisit.tsx";
import {Button} from "~/components/ui/button.tsx";
import StockChart from "~/components/FinancialData/StockChart.tsx";
import WorldMap from "~/components/MainDashboard/worldmap.tsx";
import StackBar from "~/components/FinancialData/StackBar.tsx";
import StackBarAirCraft from "~/components/FinancialData/StackBarAirCraft.tsx";
import YearlyRevenueChart from "~/components/FinancialData/YearlyRevenueChart.tsx";

// import {cn} from "~/lib/utils.ts";

export function FinancialDashboard() {

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                        <StockChart />


                        {/*</CardContent>*/}
                    </Card>

                    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-5">
                        <CardHeader className="px-7">
                            <CardTitle>Financial Data for Hotel Industry</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StackBar />
                        </CardContent>
                    </Card>

                    <Card className="col-span-2" x-chunk="dashboard-01-chunk-5">
                        <CardHeader className="px-7">
                            <CardTitle>Financial Data for AirLines Industry</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StackBarAirCraft />
                        </CardContent>
                    </Card>

                    {/*<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">*/}
                    {/*    <CardHeader className="px-7">*/}
                    {/*        <CardTitle>Financial Data for AirLines Industry</CardTitle>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <YearlyRevenueChart />*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}

                </div>
            </div>
        </div>
    )
}
