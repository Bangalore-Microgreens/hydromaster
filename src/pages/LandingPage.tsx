import { Leaf, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-20 pb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HydroMaster Dashboard</h1>
          <p className="text-xl text-gray-600 mb-12">Select your dashboard type to continue</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Grower Dashboard Card */}
          <Link to="/grower" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <Leaf className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Grower Dashboard</h2>
              <p className="text-gray-600 text-center">
                Monitor your hydroponics system in real-time, track yields, and manage system parameters.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center text-green-600 group-hover:text-green-700">
                  Access Dashboard <span className="ml-2">→</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Investor Dashboard Card */}
          <Link to="/investor" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <TrendingUp className="h-16 w-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Investor Dashboard</h2>
              <p className="text-gray-600 text-center">
                Track investment performance, monitor yields, and view financial metrics in real-time.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center text-blue-600 group-hover:text-blue-700">
                  Access Dashboard <span className="ml-2">→</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 