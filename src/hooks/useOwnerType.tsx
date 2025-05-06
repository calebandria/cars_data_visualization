import {useState, useEffect } from "react";

export interface OwnershipType {
    type: string;
    count: number;
}
export interface OwnerCharData {
    type: string;
    count: number;
    fill: string;
}
interface UseOwnerTypeResult {
    chartData: OwnerCharData[];
    loading: boolean,
    error: string| null
}

export const useOwnerType = (apiUrl: string = "http://localhost:8080/api/owner_type"): UseOwnerTypeResult => {
    const [chartData, setChartData] = useState<OwnerCharData[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const fetchData = async () => {
                    try {
                        const response = await fetch(apiUrl);
                        if (!response.ok) {
                            throw new Error('Failed to fetch ownership data');
                        }
                        const data: OwnershipType[] = await response.json();
        
                        // Transform API data for Recharts
                        const transformedData = data.map((item, index) => ({
                            type: item.type,
                            count: item.count,
                            fill: `var(--chart-${index+1})`,
                        }));
                        
        
                        setChartData(transformedData);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : 'An error occurred');
                    } finally {
                        setLoading(false);
                    }
                };
        
                fetchData();
    }, [apiUrl]);

    return { chartData, loading, error };
}