import React from 'react';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  title: string;
  optimal: { min: number; max: number };
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, min, max, unit, title, optimal }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const isOptimal = value >= optimal.min && value <= optimal.max;
  const rotation = (percentage * 180) / 100 - 90;

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="relative w-32 h-32 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-8 border-gray-200"></div>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
            transition: 'transform 0.5s ease-out',
          }}
        >
          <div className="w-1 h-16 bg-black origin-bottom rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${isOptimal ? 'text-green-500' : 'text-red-500'}`}>
            {value}
            <span className="text-sm ml-1">{unit}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;