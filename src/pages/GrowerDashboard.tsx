import React, { useState, useEffect } from 'react';
import { 
  Droplets, Thermometer, Activity, Beaker, Leaf, 
  AlertTriangle, Settings, Menu, Sprout, 
  CloudRain, Battery, Wind
} from 'lucide-react';
import GaugeChart from '../components/GaugeChart';
import LineGraph from '../components/LineGraph';
import { MonitoringSystem, VerificationProcess } from '../types/monitoring';

interface SystemData {
  temperature: number;
  ph: number;
  tds: number;
  waterFlow: number;
  waterLevel: number;
  nutrients: number;
  energy: number;
  terra: number;
  emissions: {
    removed: number;
    produced: number;
    prevented: number;
  };
  monitoring: {
    waterSystem: MonitoringSystem;
    nutrientSystem: MonitoringSystem;
    energySystem: MonitoringSystem;
    yieldProduction: MonitoringSystem;
  };
  verification: VerificationProcess;
}

const generateData = (): SystemData => ({
  temperature: Math.random() * (30 - 20) + 20,
  ph: Math.random() * (7.5 - 5.5) + 5.5,
  tds: Math.random() * (1200 - 800) + 800,
  waterFlow: Math.random() * (2.5 - 0.5) + 0.5,
  waterLevel: Math.random() * (100 - 0) + 0,
  nutrients: Math.random() * (100 - 0) + 0,
  energy: Math.random() * (100 - 0) + 0,
  terra: Math.random() * (100 - 0) + 0,
  emissions: {
    removed: Math.random() * 100,
    produced: Math.random() * 50,
    prevented: Math.random() * 75
  },
  monitoring: {
    waterSystem: {
      type: 'sensors',
      status: 'active',
      lastChecked: new Date(),
      frequency: 'realtime'
    },
    nutrientSystem: {
      type: 'sensors',
      status: 'active',
      lastChecked: new Date(),
      frequency: 'realtime'
    },
    energySystem: {
      type: 'sensors',
      status: 'active',
      lastChecked: new Date(),
      frequency: 'realtime'
    },
    yieldProduction: {
      type: 'sensors',
      status: 'active',
      lastChecked: new Date(),
      frequency: 'realtime'
    }
  },
  verification: {
    annualAudit: {
      lastDate: new Date(),
      nextDate: new Date(),
      status: 'completed'
    },
    calibrationChecklist: [],
    dataIntegrity: {
      lastCheck: new Date(),
      status: 'passed',
      issues: []
    },
    methodologyCompliance: {
      status: 'compliant',
      carbonCredits: true,
      minted: true
    }
  }
});

function GrowerDashboard() {
  const [data, setData] = useState<SystemData>(generateData());
  const [historicalData, setHistoricalData] = useState<Array<SystemData & { time: Date }>>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateData();
      setData(newData);
      setHistoricalData(prev => [...prev, { ...newData, time: new Date() }].slice(-50));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const ResourceCard = ({ title, value, icon, trend }: { 
    title: string; 
    value: number; 
    icon: React.ReactNode;
    trend: 'up' | 'down' | 'stable';
  }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-600">{icon}</div>
        <div className={`text-sm font-semibold ${
          trend === 'up' ? 'text-green-500' : 
          trend === 'down' ? 'text-red-500' : 
          'text-gray-500'
        }`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} 
          {trend === 'stable' ? 'Stable' : `${Math.round(Math.random() * 10)}%`}
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value.toFixed(1)}%</p>
    </div>
  );

  const getSystemAlerts = (data: SystemData) => {
    const alerts = [];
    
    if (data.tds > 1200 || data.tds < 800) {
      alerts.push({
        message: "TDS levels are outside recommended range",
        type: "warning"
      });
    }
    
    if (data.ph > 6.5 || data.ph < 5.5) {
      alerts.push({
        message: "pH levels need adjustment",
        type: "warning"
      });
    }

    if (data.waterLevel < 20) {
      alerts.push({
        message: "Water level is critically low",
        type: "error"
      });
    }

    if (data.nutrients < 30) {
      alerts.push({
        message: "Nutrient levels are low",
        type: "warning"
      });
    }

    return alerts;
  };

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
        {/* System Alerts Section */}
        <div className="mb-8">
          {getSystemAlerts(data).map((alert, index) => (
            <div 
              key={index}
              className={`mb-4 p-4 rounded-lg flex items-center ${
                alert.type === 'error' 
                  ? 'bg-red-50 border-l-4 border-red-400' 
                  : 'bg-yellow-50 border-l-4 border-yellow-400'
              }`}
            >
              <AlertTriangle className={`h-5 w-5 ${
                alert.type === 'error' ? 'text-red-400' : 'text-yellow-400'
              }`} />
              <p className={`ml-3 ${
                alert.type === 'error' ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {alert.message}
              </p>
            </div>
          ))}
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                getSystemAlerts(data).length === 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {getSystemAlerts(data).length === 0 ? 'All Systems Normal' : `${getSystemAlerts(data).length} Alerts`}
              </span>
            </div>
          </div>
        </div>

        {/* Resource Monitoring Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <ResourceCard 
            title="Nutrients"
            value={data.nutrients}
            icon={<Sprout className="h-6 w-6"/>}
            trend="up"
          />
          <ResourceCard 
            title="Water"
            value={data.waterLevel}
            icon={<CloudRain className="h-6 w-6"/>}
            trend="stable"
          />
          <ResourceCard 
            title="Energy"
            value={data.energy}
            icon={<Battery className="h-6 w-6"/>}
            trend="down"
          />
          <ResourceCard 
            title="Terra"
            value={data.terra}
            icon={<Leaf className="h-6 w-6"/>}
            trend="up"
          />
          <ResourceCard 
            title="Emissions"
            value={data.emissions.prevented}
            icon={<Wind className="h-6 w-6"/>}
            trend="up"
          />
        </div>

        {/* Enhanced Gauge Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GaugeChart
            value={Number(data.temperature.toFixed(1))}
            min={15}
            max={35}
            unit="°C"
            title="Temperature"
            optimal={{ min: 20, max: 25 }}
          />
          <GaugeChart
            value={Number(data.ph.toFixed(1))}
            min={0}
            max={14}
            unit="pH"
            title="pH Level"
            optimal={{ min: 5.5, max: 6.5 }}
          />
          <GaugeChart
            value={Math.round(data.tds)}
            min={0}
            max={2000}
            unit="ppm"
            title="TDS"
            optimal={{ min: 800, max: 1200 }}
          />
          <GaugeChart
            value={Number(data.waterFlow.toFixed(1))}
            min={0}
            max={5}
            unit="L/min"
            title="Water Flow"
            optimal={{ min: 1, max: 2 }}
          />
        </div>

        {/* Carbon Sequestration Metrics */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carbon Impact</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">CO₂ Removed</p>
              <p className="text-2xl font-bold text-green-500">
                {data.emissions.removed.toFixed(1)} kg
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">CO₂ Produced</p>
              <p className="text-2xl font-bold text-red-500">
                {data.emissions.produced.toFixed(1)} kg
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">CO₂ Prevented</p>
              <p className="text-2xl font-bold text-blue-500">
                {data.emissions.prevented.toFixed(1)} kg
              </p>
            </div>
          </div>
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
              value={data.ph.toFixed(1)}
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

        {/* Monitoring Systems */}
        <MonitoringSection monitoring={data.monitoring} />

        {/* Verification Process */}
        <VerificationSection verification={data.verification} />
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

const MonitoringSection: React.FC<{ monitoring: SystemData['monitoring'] }> = ({ monitoring }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4">System Monitoring</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(monitoring).map(([system, data]) => (
        <div key={system} className="border rounded-lg p-4">
          <h3 className="font-medium capitalize mb-2">{system.replace(/([A-Z])/g, ' $1')}</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Type: {data.type}</p>
            <p className={`text-sm ${data.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {data.status}
            </p>
            <p className="text-sm text-gray-600">Frequency: {data.frequency}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VerificationSection: React.FC<{ verification: VerificationProcess }> = ({ verification }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4">Verification Process</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">Annual System Audit</h3>
        <p className={`text-sm ${verification.annualAudit.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
          Status: {verification.annualAudit.status}
        </p>
      </div>
      {/* Add other verification sections */}
    </div>
  </div>
);

export default GrowerDashboard;