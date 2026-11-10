import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Utensils, TrendingUp, Package, Recycle, BrainCircuit } from 'lucide-react';

const demandData = [
  { time: '09:00', demand: 120 },
  { time: '11:00', demand: 280 },
  { time: '13:00', demand: 450 },
  { time: '15:00', demand: 310 },
  { time: '17:00', demand: 150 },
];

const wasteData = [
  { day: 'Mon', waste: 45 },
  { day: 'Tue', waste: 38 },
  { day: 'Wed', waste: 25 },
  { day: 'Thu', waste: 30 },
  { day: 'Fri', waste: 20 },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }: any) => (
  <div className="glass-card p-6 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-textMuted text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <span className={trend > 0 ? "text-accent" : "text-accentBlue"}>
        {trend > 0 ? "+" : ""}{trend}%
      </span>
      <span className="text-textMuted">vs last week</span>
    </div>
  </div>
);

export default function Dashboard() {
  const [modelInfo, setModelInfo] = useState("XGBoost (R²: 0.94)");

  useEffect(() => {
    fetch('http://localhost:5000/api/model/metrics')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
           const actualModelName = data.selected_model.replace(' (Mock)', '');
           const metrics = data.metrics[actualModelName] || data.metrics["XGBoost"];
           setModelInfo(`${data.selected_model} (R²: ${metrics.R2})`);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard Overview</h1>
          <p className="text-textMuted">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
          <BrainCircuit className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium">Active Model: <span className="text-accent">{modelInfo}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Total Demand" 
          value="1,310" 
          icon={TrendingUp} 
          trend={12.5}
          colorClass="bg-accent/20 text-accent"
        />
        <StatCard 
          title="Avg Recommended Prep" 
          value="1,385" 
          icon={Utensils} 
          trend={10.2}
          colorClass="bg-accentBlue/20 text-accentBlue"
        />
        <StatCard 
          title="Expected Food Waste" 
          value="15 kg" 
          icon={Recycle} 
          trend={-18.4}
          colorClass="bg-green-500/20 text-green-400"
        />
        <StatCard 
          title="Active Inventory Items" 
          value="48" 
          icon={Package} 
          trend={2.1}
          colorClass="bg-purple-500/20 text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Today's Demand Forecast</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandData}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="demand" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Weekly Waste Reduction Trend (kg)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="waste" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
