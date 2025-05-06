import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { useOwnerType, OwnerCharData} from "@/hooks/useOwnerType";
import OverlayTableOwnerType from "./OverlayTableOwnerType";
interface OwnershipTypeProps {
    apiUrl?: string
}

const OwnershipTypeDonutChart: React.FC<OwnershipTypeProps> = ({apiUrl}) => {
    const {chartData, loading, error} = useOwnerType(apiUrl);
      const [open, setOpen] = React.useState(false);
      const [selectedBrandData, setSelectedBrandData] = React.useState<OwnerCharData | null>(null);

      const handleClickBar = (entry:any) => {
        setSelectedBrandData(entry);
        setOpen(true);
      }
    // Calculate total count for the center label
    const totalCount = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, [chartData]);

      // Generate chartConfig dynamically from data
  const chartConfig: ChartConfig = chartData.reduce((config, item, index) => ({
    ...config,
    [`brand${index + 1}`]: {
      label: item.type.charAt(0).toUpperCase() + item.type.slice(1), // Capitalize brand name
      color: `hsl(${200 + index * 10}, 70%, 50%)`,
    },
  }), { count: { label: "Vehicles" } } satisfies ChartConfig);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-[30vw]">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Car Ownership Types</CardTitle>
                    <CardDescription>Distribution of Ownership Types</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey="type"
                                innerRadius={60}
                                strokeWidth={5}
                                onClick={handleClickBar}
                                cursor="pointer"
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalCount.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Vehicles
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Data updated as of May 2025 <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Showing ownership type distribution
                    </div>
                </CardFooter>
            </Card>
            <OverlayTableOwnerType open={open} selectedBrandData={selectedBrandData} setOpen={setOpen}/>
        </div>
    );
};

export default OwnershipTypeDonutChart;