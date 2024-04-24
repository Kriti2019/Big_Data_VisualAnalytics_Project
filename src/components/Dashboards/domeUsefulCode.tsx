import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {Link, useNavigate} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "~/components/ui/breadcrumb.tsx";
import {Slider} from "~/components/ui/slider"
import React from "react";
import LineGraphComponent, {GenderWiseGraph} from "~/components/GenderDashboard/GenderBarGraph.tsx";
import {MonthWiseGraph} from "~/components/GenderDashboard/MonthWiseGraph.tsx";
import {QuarterWiseData, quarterWiseData} from "~/components/GenderDashboard/quarterWiseData.tsx";
import {AgeGroup} from "~/components/GenderDashboard/AgeGroupGraphs.tsx";
import {PurposeOfVisitGraph} from "~/components/GenderDashboard/PurposeOfVisit.tsx";
import {Button} from "~/components/ui/button.tsx";

// import {cn} from "~/lib/utils.ts";

export function DashboardFTA() {
    // type SliderProps = React.ComponentProps<typeof Slider>

    const [slider, setSlider] = React.useState<string[]>(['2001'])
    const [dragSlider, setdragSlider] = React.useState<string[]>(['2001'])
    const handleSliderChange = (e) => {
        setSlider(e)
    }

    const handleDragChange = (e) => {
        setdragSlider(e)
    }
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
                        {/*<Card x-chunk="dashboard-01-chunk-0">*/}
                        {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
                        {/*        <CardTitle className="text-sm font-medium">*/}
                        {/*            Total Revenue*/}
                        {/*        </CardTitle>*/}
                        {/*        {dragSlider}*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <Slider defaultValue={slider} min={2001} max={2021} step={1}*/}
                        {/*                onValueCommit={handleSliderChange}*/}
                        {/*                onValueChange={handleDragChange}/>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                        {/*<Card x-chunk="dashboard-01-chunk-1">*/}
                        {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
                        {/*        <CardTitle className="text-sm font-medium">*/}
                        {/*            Subscriptions*/}
                        {/*        </CardTitle>*/}
                        {/*        <Users className="h-4 w-4 text-muted-foreground"/>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <div className="text-2xl font-bold">+2350</div>*/}
                        {/*        <p className="text-xs text-muted-foreground">*/}
                        {/*            +180.1% from last month*/}
                        {/*        </p>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                        {/*<Card x-chunk="dashboard-01-chunk-2">*/}
                        {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
                        {/*        <CardTitle className="text-sm font-medium">Sales</CardTitle>*/}
                        {/*        <CreditCard className="h-4 w-4 text-muted-foreground"/>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <div className="text-2xl font-bold">+12,234</div>*/}
                        {/*        <p className="text-xs text-muted-foreground">*/}
                        {/*            +19% from last month*/}
                        {/*        </p>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                        {/*<Card x-chunk="dashboard-01-chunk-3">*/}
                        {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
                        {/*        <CardTitle className="text-sm font-medium">Active Now</CardTitle>*/}
                        {/*        <Activity className="h-4 w-4 text-muted-foreground"/>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <div className="text-2xl font-bold">+573</div>*/}
                        {/*        <p className="text-xs text-muted-foreground">*/}
                        {/*            +201 since last hour*/}
                        {/*        </p>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">

                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <MonthWiseGraph/>
                        </Card>
                        <QuarterWiseData/>
                    </div>

                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <GenderWiseGraph/>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader>
                                <CardTitle>Over All</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                        <AvatarFallback>M</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Male
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/02.png" alt="Avatar"/>
                                        <AvatarFallback>F</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Female
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/03.png" alt="Avatar"/>
                                        <AvatarFallback>NA</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Not Responded
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <AgeGroup/>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader>
                                <CardTitle>Over All</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                        <AvatarFallback>M</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Male
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/02.png" alt="Avatar"/>
                                        <AvatarFallback>F</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Female
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/03.png" alt="Avatar"/>
                                        <AvatarFallback>NA</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Not Responded
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <PurposeOfVisitGraph/>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader>
                                <CardTitle>Over All</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                        <AvatarFallback>M</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Male
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/02.png" alt="Avatar"/>
                                        <AvatarFallback>F</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Female
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/03.png" alt="Avatar"/>
                                        <AvatarFallback>NA</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Not Responded
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">1000</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="sm:col-span-6" x-chunk="dashboard-05-chunk-0">
                                <CardHeader className="pb-3">
                                    <CardTitle>Explore</CardTitle>
                                    <CardDescription className="leading-relaxed">
                                        Get More In Depth Information of these data points.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button onClick={routeChange}>Explore</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
