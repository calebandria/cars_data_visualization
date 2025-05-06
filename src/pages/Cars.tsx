import BarPlotCar from "../components/BarPlotCar";
import OwnershipTypeChart from "@/components/OwnerShipTypeDonutChart";
const Cars: React.FC = () => {

    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-primary">Cars</h1>
                <p className="mt-4 text-gray-600">Welcome to the Cars page.</p>
            </div>
            <div className="flex">
                <BarPlotCar />
                <OwnershipTypeChart />
            </div>
        </>
    )
}

export default Cars;