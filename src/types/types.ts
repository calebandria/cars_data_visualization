export interface CityData {
    name: string;
    latitude: number;
    longitude: number;
    count?: number
    // Add other relevant data fields
  }
  
  export const cityDataWithDetails: CityData[] = [
    { name: "Coimbatore", latitude: 11.0168, longitude: 76.9558},
    { name: "Jaipur", latitude: 26.9139, longitude: 75.8727 },
    { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
    { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },
    { name: "Kochi", latitude: 9.9312, longitude: 76.2673 },
    { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 },
    { name: "Chennai", latitude: 13.0827, longitude: 80.2707 },
    { name: "Delhi", latitude: 28.7041, longitude: 77.1025 },
    { name: "Pune", latitude: 18.5204, longitude: 73.8567},
    { name: "Ahmedabad", latitude: 23.0225, longitude: 72.5714},
    { name: "Hyderabad", latitude: 17.3850, longitude: 78.4867 },
  ];