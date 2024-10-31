import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  Beaker, 
  Leaf, 
  AlertTriangle,
  Settings,
  Menu
} from 'lucide-react';
import GaugeChart from '../components/GaugeChart';
import LineGraph from '../components/LineGraph';

// Simulate real-time data
const generateData = () => ({
  temperature: Math.random() * (30 - 20) + 20,
  ph: Math.random() * (7.5 - 5.5) + 5.5,
  tds: Math.random() * (1200 - 800) + 800,
  waterFlow: Math.random() * (2.5 - 0.5) + 0.5,
  waterLevel: Math.random() * (100 - 0) + 0,
});

function GrowerDashboard() {
  const [data, setData] = useState(generateData());
  const [historicalData, setHistoricalData] = useState<Array<any>>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateData();
      setData(newData);
      setHistoricalData(prev => [...prev, { ...newData, time: new Date() }].slice(-50));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-4">
                <Leaf className="h-8 w-8 text-green-500" />
                <h1 className="ml-2 text-xl font-semibold text-gray-900">HydroMaster</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Section */}
        {data.tds > 1000 && (
          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <p className="ml-3 text-yellow-700">
                TDS levels are above recommended range. Consider adjusting nutrient solution.
              </p>
            </div>
          </div>
        )}

        {/* Gauge Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GaugeChart
            value={data.temperature}
            min={15}
            max={35}
            unit="°C"
            title="Temperature"
            optimal={{ min: 20, max: 25 }}
          />
          <GaugeChart
            value={data.ph}
            min={0}
            max={14}
            unit="pH"
            title="pH Level"
            optimal={{ min: 5.5, max: 6.5 }}
          />
          <GaugeChart
            value={data.tds}
            min={0}
            max={2000}
            unit="ppm"
            title="TDS"
            optimal={{ min: 800, max: 1200 }}
          />
          <GaugeChart
            value={data.waterFlow}
            min={0}
            max={5}
            unit="L/min"
            title="Water Flow"
            optimal={{ min: 1, max: 2 }}
          />
        </div>

        {/* Line Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineGraph
            data={historicalData.map(d => ({ time: d.time, value: d.temperature }))}
            title="Temperature History"
            color="#ff9800"
            unit="°C"
          />
          <LineGraph
            data={historicalData.map(d => ({ time: d.time, value: d.ph }))}
            title="pH History"
            color="#2196f3"
            unit="pH"
          />
        </div>

        {/* System Status Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusCard
              icon={<Thermometer className="w-6 h-6" />}
              label="Temperature"
              value={`${data.temperature.toFixed(1)}°C`}
              status={data.temperature >= 20 && data.temperature <= 25 ? 'normal' : 'warning'}
            />
            <StatusCard
              icon={<Beaker className="w-6 h-6" />}
              label="pH Level"
              value={data.ph.toFixed(2)}
              status={data.ph >= 5.5 && data.ph <= 6.5 ? 'normal' : 'warning'}
            />
            <StatusCard
              icon={<Activity className="w-6 h-6" />}
              label="TDS"
              value={`${Math.round(data.tds)} ppm`}
              status={data.tds >= 800 && data.tds <= 1200 ? 'normal' : 'warning'}
            />
            <StatusCard
              icon={<Droplets className="w-6 h-6" />}
              label="Water Flow"
              value={`${data.waterFlow.toFixed(1)} L/min`}
              status={data.waterFlow >= 1 && data.waterFlow <= 2 ? 'normal' : 'warning'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'error';
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, label, value, status }) => {
  const statusColors = {
    normal: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
      <div className={`${statusColors[status]} mr-4`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default GrowerDashboard;