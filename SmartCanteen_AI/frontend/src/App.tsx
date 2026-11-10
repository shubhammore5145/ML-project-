import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import FoodItems from './pages/FoodItems';
import DemandPrediction from './pages/DemandPrediction';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import WasteReduction from './pages/WasteReduction';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/food-items" element={<FoodItems />} />
              <Route path="/prediction" element={<DemandPrediction />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/waste-reduction" element={<WasteReduction />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
