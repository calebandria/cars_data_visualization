import { useState, useEffect } from "react";

// Interface for API data
export interface BrandData {
  brand: string;
  count: number;
}

// Interface for chart data
export interface ChartData {
  brand: string;
  count: number;
  fill: string;
}

interface UseBrandDataResult {
  data: ChartData[];
  loading: boolean;
  error: string | null;
}

export const useBrandData = (apiUrl: string = "http://localhost:8080/api/brands"): UseBrandDataResult => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData: BrandData[] = await response.json();

        // Map to chart data (top 8 brands + Others)
        const topBrands = rawData.slice(0, 16);
        const othersCount = rawData
          .slice(16)
          .reduce((sum, item) => sum + item.count, 0);
        const others = { brand: "others", count: othersCount }

        topBrands.push(others)
        const chartData: ChartData[] = [
          ...rawData.map((item, index) => ({
            brand: item.brand,
            count: item.count,
            fill: `var(--color-brand${index + 1})`,
          }))
        ];

        setData(chartData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch brand data");
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, loading, error };
};
