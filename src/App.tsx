import Sidebar from "./components/SideBar"
import { Routes, Route} from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import MapPage from "./pages/MapPage";

const DataPage: React.FC = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-primary">Data</h1>
    <p className="mt-4 text-gray-600">This is the Data page.</p>
  </div>
);
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-16 sm:ml-64">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;