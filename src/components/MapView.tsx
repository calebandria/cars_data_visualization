import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CityData } from '../types/types'; // Assuming your data interface
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"; // Adjust path based on your Shadcn UI setup

// Fix for Leaflet marker icon issue
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import CarDataTableByLocation from './CarDataTableByLocation';
import { useLocation } from '@/hooks/useLocation';


let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapWithDialogProps {
  apiUrl?: string;
}

const MapWithDialog: React.FC<MapWithDialogProps> = ({ apiUrl }) => {
  const {data} = useLocation(apiUrl);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState<CityData | null>(null);

  const handleMarkerClick = (city: CityData) => {
    setSelectedCityData(city);
    setIsDialogOpen(true);
  };

  // Calculate initial map view
  const bounds = data.map(city => [city.latitude, city.longitude] as [number, number]);
  const center = bounds.length > 0 ? bounds.reduce((acc, curr) => [acc[0] + curr[0] / bounds.length, acc[1] + curr[1] / bounds.length], [0, 0]) : [0, 0];
  const zoom = bounds.length > 0 ? 6 : 2;

  return (
    <div className="relative">
      {/* Semi-transparent overlay behind everything */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

      {/* Map Container above the overlay */}
      <div className="relative z-10">
        <MapContainer
          className="leaflet-container"
          center={center}
          zoom={zoom}
          style={{ height: '500px', width: '100%', zIndex: 10 }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((city) => (
            <Marker
              key={city.name}
              position={[city.latitude, city.longitude]}
              eventHandlers={{
                click: () => handleMarkerClick(city),
              }}
            >
              <Tooltip direction="right" offset={[10, 0]}>
                {city.name} <br/>Cars: {city.count}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Dialog above everything */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[50vw] z-50">
          <DialogHeader>
            <DialogTitle>{selectedCityData?.name} Details</DialogTitle>
            <DialogDescription>
              Information about {selectedCityData?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedCityData && (
            <CarDataTableByLocation location={selectedCityData.name}/>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapWithDialog;