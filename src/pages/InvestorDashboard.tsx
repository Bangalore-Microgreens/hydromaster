import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Scale } from 'lucide-react';
import LineGraph from '../components/LineGraph';

interface YieldData {
  time: Date;
  monthlyYield: number;
  credits: number;
  projectedValue: number;
}

interface FinancialMetrics {
  totalYield: number;
  creditsGenerated: number;
  projectedCredits: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const InvestorDashboard = () => {
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics>({
    totalYield: 0,
    creditsGenerated: 0,
    projectedCredits: 0
  });

  useEffect(() => {
    const generateYieldData = () => ({
      monthlyYield: Math.random() * 1000,
      credits: Math.random() * 500,
      projectedValue: Math.random() * 2000,
      time: new Date()
    });

    const interval = setInterval(() => {
      const newData = generateYieldData();
      setYieldData(prev => [...prev, newData].slice(-30));
      setFinancialMetrics({
        totalYield: Math.round(Math.random() * 10000),
        creditsGenerated: Math.round(Math.random() * 5000),
        projectedCredits: Math.round(Math.random() * 8000)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        {/* Similar navbar structure as GrowerDashboard */}
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Yield"
            value={`${financialMetrics.totalYield.toLocaleString()} kg`}
            icon={<Scale className="h-8 w-8 text-green-500" />}
          />
          <MetricCard
            title="Credits Generated"
            value={`${financialMetrics.creditsGenerated.toLocaleString()} credits`}
            icon={<DollarSign className="h-8 w-8 text-blue-500" />}
          />
          <MetricCard
            title="Projected Credits"
            value={`${financialMetrics.projectedCredits.toLocaleString()} credits`}
            icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineGraph
            data={yieldData.map(d => ({ time: d.time, value: d.monthlyYield }))}
            title="Monthly Yield"
            color="#10B981"
            unit=" kg"
          />
          <LineGraph
            data={yieldData.map(d => ({ time: d.time, value: d.credits }))}
            title="Carbon Credits"
            color="#6366F1"
            unit=" credits"
          />
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      {icon}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default InvestorDashboard; 