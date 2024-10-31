import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Scale } from 'lucide-react';
import LineGraph from '../components/LineGraph';
import { TokenCredit } from '../types/monitoring';

interface YieldData {
  time: Date;
  monthlyYield: number;
  credits: number;
  projectedValue: number;
  tokenCredits: TokenCredit;
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
      tokenCredits: {
        baselineCredits: Math.random() * 1000,
        qualityMultiplier: Math.random() * 10 + 1,
        finalCreditValue: Math.random() * 1000
      },
      time: new Date()
    });

    const initialData = generateYieldData();
    setYieldData([initialData]);

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

        {yieldData.length > 0 && (
          <TokenCreditSection tokenCredits={yieldData[yieldData.length - 1].tokenCredits} />
        )}
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

const TokenCreditSection: React.FC<{ tokenCredits: TokenCredit }> = ({ tokenCredits }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4">Token Credit System</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <p className="text-sm text-gray-500">Baseline Credits</p>
        <p className="text-2xl font-bold text-blue-500">
          {tokenCredits.baselineCredits.toFixed(2)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Quality Multiplier</p>
        <p className="text-2xl font-bold text-green-500">
          {tokenCredits.qualityMultiplier.toFixed(2)}x
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Final Credit Value</p>
        <p className="text-2xl font-bold text-purple-500">
          {tokenCredits.finalCreditValue.toFixed(2)}
        </p>
      </div>
    </div>
  </div>
);

export default InvestorDashboard; 