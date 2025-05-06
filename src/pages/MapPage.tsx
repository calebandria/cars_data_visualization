import MapWithDialog from "@/components/MapView";
const MapPage: React.FC = () => {

    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-primary">Map</h1>
                <p className="mt-4 text-gray-600">This is the Map page.</p>
            </div>
            <MapWithDialog/>
        </>

    )
};
export default MapPage
