# HydroMaster Dashboard

![HydroMaster](https://img.shields.io/badge/HydroMaster-1.0.0-green)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0.0-blueviolet)

HydroMaster is a sophisticated dual-interface dashboard system designed for modern hydroponics operations. It provides real-time monitoring, analytics, and financial tracking capabilities through specialized interfaces for both growers and investors.

## 🌱 Features

### Grower Dashboard

- **Real-time Monitoring**
  - Temperature control (15-35°C)
  - pH levels (0-14)
  - TDS (Total Dissolved Solids) monitoring
  - Water flow rates
- **Alert System**
  - Automated notifications for out-of-range parameters
  - Visual indicators for system status
- **Data Visualization**
  - Interactive gauge charts
  - Historical trend graphs
  - System status cards

### Investor Dashboard

- **Financial Metrics**
  - Total yield tracking
  - Carbon credit generation
  - Projected earnings
- **Performance Analytics**
  - Real-time yield data
  - Credit generation trends
  - Investment performance metrics

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn

2. **Installation**

   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/hydromaster-dashboard.git

   # Install dependencies
   cd hydromaster-dashboard
   npm install
   ```

3. **Development**

   ```bash
   # Start development server
   npm run dev
   ```

4. **Build**

   ```bash
   # Create production build
   npm run build
   ```

## 🛠 Technical Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router
- **Build Tool**: Vite

## 📁 Project Structure

src/
├── components/
│ ├── GaugeChart/
│ ├── LineGraph/
│ └── StatusCard/
├── pages/
│ ├── LandingPage/
│ ├── GrowerDashboard/
│ └── InvestorDashboard/
├── App.tsx
└── main.tsx

## 🔄 Real-time Updates

The system provides real-time monitoring with:

- 2-second update intervals for grower dashboard
- 5-second update intervals for investor metrics
- Historical data retention for trend analysis

## 🎯 Parameter Ranges

| Parameter    | Min  | Max  | Optimal Range |
|-------------|------|------|---------------|
| Temperature | 15°C | 35°C | 20-25°C      |
| pH Level    | 0    | 14   | 5.5-6.5      |
| TDS         | 0    | 2000 | 800-1200 ppm |
| Water Flow  | 0    | 5    | 1-2 L/min    |

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_UPDATE_INTERVAL=2000
VITE_HISTORICAL_DATA_POINTS=50
```

## 📈 Future Enhancements

- API integration for real data
- User authentication system
- Mobile application
- Advanced analytics dashboard
- Export functionality for reports
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- React Team
- Tailwind CSS Team
- Recharts Contributors
- Lucide React Team

---

Built with 💚 by Shaan & Sandy
