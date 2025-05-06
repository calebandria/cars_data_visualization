import { useState, useEffect } from "react";
import { cityDataWithDetails,CityData } from "@/types/types";

export interface LocationData {
  location: string;
  count: number;
}

interface UseLocationDataResult {
  data: CityData[];
  loading: boolean;
  error: string | null;
}

export const useLocation = (apiUrl: string = "http://localhost:8080/api/locations"): UseLocationDataResult => {
  const [data, setData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData: LocationData[] = await response.json();

        const countMap = new Map<string, number>();
        rawData.forEach(item => {
          countMap.set(item.location, item.count);
        });
        
        // Iterate through cityDataWithDetails and add the count if a match is found
        const updatedCityDataWithDetails: CityData[] = cityDataWithDetails.map(city => {
          const count = countMap.get(city.name);
          if (count !== undefined) {
            return { ...city, count };
          }
          return city;
        });
        
        console.log(updatedCityDataWithDetails);

        setData(updatedCityDataWithDetails);
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
