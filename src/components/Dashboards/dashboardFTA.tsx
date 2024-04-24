import React from "react";
import {
    Card,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {Link, useNavigate} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "~/components/ui/breadcrumb.tsx";
import {GenderWiseGraph} from "~/components/GenderDashboard/GenderBarGraph.tsx";
import {MonthWiseGraph} from "~/components/GenderDashboard/MonthWiseGraph.tsx";
import {QuarterWiseData} from "~/components/GenderDashboard/quarterWiseData.tsx";
import {AgeGroup} from "~/components/GenderDashboard/AgeGroupGraphs.tsx";
import {PurposeOfVisitGraph} from "~/components/GenderDashboard/PurposeOfVisit.tsx";
import {Button} from "~/components/ui/button.tsx";

export function DashboardFTA() {

    const navigate = useNavigate();
    const routeChange = () => {
        navigate('../compareFTA');
    }

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
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                            <MonthWiseGraph/>
                        </Card>
                            <QuarterWiseData/>
                    </div>

                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            <GenderWiseGraph/>
                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <AgeGroup/>
                    </div>
                        <Card className="col-span-2" x-chunk="dashboard-01-chunk-5">
                            <PurposeOfVisitGraph/>
                        </Card>
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="sm:col-span-6" x-chunk="dashboard-05-chunk-0">
                                <CardHeader className="pb-3">
                                    <CardTitle>Comparison</CardTitle>
                                    <CardDescription className="leading-relaxed">
                                        Compare two countries with above given data points.
                                    </CardDescription>
                                </CardHeader>
                                <br/>
                                <CardFooter>
                                    <Button onClick={routeChange}>Compare</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
