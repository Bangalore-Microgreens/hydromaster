import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';
import GrowerDashboard from '../src/pages/GrowerDashboard';
import InvestorDashboard from '../src/pages/InvestorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/grower" element={<GrowerDashboard />} />
        <Route path="/investor" element={<InvestorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;