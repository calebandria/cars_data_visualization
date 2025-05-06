import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { useState } from "react";
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
import OverlayTableCar from "./OverlayTableCar";
import { useBrandData, ChartData } from "../hooks/useBrandData";

interface BrandBarChartProps {
  apiUrl?: string; // Optional prop to override default API URL
}

const BarPlotCar: React.FC<BrandBarChartProps> = ({ apiUrl }) => {
  const { data, loading, error } = useBrandData(apiUrl);
  const [open, setOpen] = useState(false);
  const [selectedBrandData, setSelectedBrandData] = useState<ChartData | null>(null);
  
  const handleClickBar = (entry:any) => {
    setSelectedBrandData(entry);
    setOpen(true);
  }
  // Generate chartConfig dynamically from data
  const chartConfig: ChartConfig = data.reduce((config, item, index) => ({
    ...config,
    [`brand${index + 1}`]: {
      label: item.brand.charAt(0).toUpperCase() + item.brand.slice(1), // Capitalize brand name
      color: `hsl(${200 + index * 10}, 70%, 50%)`,
    },
  }), { count: { label: "Cars" } } satisfies ChartConfig);
  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <span className="text-gray-500 animate-pulse">Loading brand data...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <span className="text-red-500">Error: {error}</span>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <span className="text-gray-600">No brand data available</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-[50vw]">
      <Card>
        <CardHeader>
          <CardTitle>Car Brand Distribution</CardTitle>
          <CardDescription>Number of cars by brand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[50vh] overflow-y-auto">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                width={100} // Increased height to fit 31 brands
              >
                <YAxis
                  dataKey="brand"
                  type="category"
                  tickLine={false}
                  tickMargin={15}
                  axisLine={false}
                  width={120}//Increased th for longer brand names
                  tickFormatter={(value) =>
                    chartConfig[`brand${data.findIndex((d) => d.brand === value) + 1}` as keyof typeof chartConfig]
                      ?.label || value
                  }
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" radius={5}>
                  {data.map((entry: ChartData, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill}
                      className="cursor-pointer" // Indicate it's clickable
                      onClick={() => {
                        handleClickBar(entry)
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
        <OverlayTableCar open={open} selectedBrandData={selectedBrandData} setOpen={setOpen}/>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Data fetched from car database <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing car counts for all brands
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BarPlotCar;