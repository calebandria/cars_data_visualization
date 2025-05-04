import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
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
import { useBrandData, ChartData } from "../hooks/userBrandData";

interface BrandBarChartProps {
  apiUrl?: string; // Optional prop to override default API URL
}

const BrandBarChart: React.FC<BrandBarChartProps> = ({ apiUrl }) => {
  const { data, loading, error } = useBrandData(apiUrl);

  // Generate chartConfig dynamically from data
  const chartConfig: ChartConfig = data.reduce((config, item, index) => ({
    ...config,
    [`brand${index + 1}`]: {
      label: item.brand.charAt(0).toUpperCase() + item.brand.slice(1), // Capitalize brand name
      color: `var(--color-brand${index + 1})`,
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
    <Card>
      <CardHeader>
        <CardTitle>Car Brand Distribution</CardTitle>
        <CardDescription>Number of cars by brand</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            height={800} // Increased height to fit 31 brands
          >
            <YAxis
              dataKey="brand"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100} // Increased width for longer brand names
              tickFormatter={(value) =>
                chartConfig[`brand${data.findIndex((d) => d.brand === value) + 1}` as keyof typeof chartConfig]
                  ?.label || value
              }
              tick={{ fontSize: 12 }}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={5}>
              {data.map((entry: ChartData, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Data fetched from car database <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing car counts for all brands
        </div>
      </CardFooter>
    </Card>
  );
};

export default BrandBarChart;