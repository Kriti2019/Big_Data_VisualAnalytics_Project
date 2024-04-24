import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "~/components/ui/breadcrumb.tsx"
import {Button} from "~/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card.tsx"
import {Link, useNavigate} from "react-router-dom";
import WorldMap from "~/components/MainDashboard/worldmap.tsx";
import BarGraphMain from "~/components/MainDashboard/BarGraphMain.tsx";

export function Dashboard() {

    const navigate = useNavigate();
    const routeChange = () => {
        navigate('../exploreFta');
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
                                    <Link to="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main
                    className="grid flex-1 items-start gap-4 p-4 grid-cols-1 sm:px-6 sm:py-0 md:gap-6 lg:grid-cols-2 xl:grid-cols-2">
                    <Card className="lg:col-span-2 xl:col-span-2" x-chunk="dashboard-05-chunk-0">
                        <CardHeader className="pb-3">
                            <CardTitle>World V/S India</CardTitle>
                            <CardDescription className="leading-relaxed">
                                Tourism and Hospitality play an extraordinary role in driving the nation's growth and
                                prosperity. India proudly boasts a tapestry of geographical diversity, encompassing
                                awe-inspiring world heritage sites and niche tourism offerings such as captivating
                                cruise tourism, exhilarating adventure tourism, renowned medical tourism, and
                                mesmerizing eco-tourism. These unique offerings have resulted in an exponential increase
                                in tourist arrivals.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                        <CardHeader className="px-7">
                            <CardTitle>Trend In Tourism</CardTitle>
                            <CardDescription>
                                Trends in Tourism from 2016 to 2021 ( Click on Play ).
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <WorldMap/>
                        </CardContent>
                    </Card>

                    {/*<Card className="" x-chunk="dashboard-05-chunk-3">*/}
                    {/*    <CardHeader className="px-7">*/}
                    {/*        <CardTitle>India Ranking</CardTitle>*/}
                    {/*        <CardDescription>*/}
                    {/*            Ranking of India*/}
                    {/*        </CardDescription>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <CardContent className="p-6 text-sm">*/}
                    {/*            <BarGraphMain />*/}
                    {/*        </CardContent>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}
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
                </main>
            </div>
        </div>
    )
}
