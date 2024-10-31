import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface LineGraphProps {
  data: Array<{ time: Date; value: number }>;
  title: string;
  color: string;
  unit: string;
  showTrend?: boolean;
}

const LineGraph: React.FC<LineGraphProps> = ({ data, title, color, unit, showTrend = true }) => {
  const currentValue = data[data.length - 1]?.value;
  const previousValue = data[data.length - 2]?.value;
  const trend = currentValue > previousValue;
  const trendDiff = Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {showTrend && currentValue && previousValue && (
          <div className={`flex items-center ${trend ? 'text-green-500' : 'text-red-500'}`}>
            {trend ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span className="ml-1 text-sm font-medium">{trendDiff}%</span>
          </div>
        )}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time"
              tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af" 
              unit={unit}
              fontSize={12}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip
              contentStyle={{ 
                background: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.375rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              labelFormatter={(label) => new Date(label).toLocaleTimeString()}
              formatter={(value: number) => [value.toFixed(2) + unit, title]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineGraph;