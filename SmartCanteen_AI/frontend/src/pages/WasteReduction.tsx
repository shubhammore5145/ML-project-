import { Recycle, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const wasteTrendData = [
  { week: 'Week 1', expected: 45, actual: 42 },
  { week: 'Week 2', expected: 40, actual: 35 },
  { week: 'Week 3', expected: 35, actual: 28 },
  { week: 'Week 4', expected: 30, actual: 20 },
  { week: 'Week 5', expected: 25, actual: 15 },
];

export default function WasteReduction() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Waste Reduction Analytics</h1>
          <p className="text-textMuted">Track AI-driven food waste minimization progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col gap-4 bg-green-500/10 border-green-500/30">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-400 text-sm font-medium">Estimated Waste Reduction</p>
              <h3 className="text-3xl font-bold text-text mt-2">66.6%</h3>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingDown className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-textMuted">Since implementing AI forecasting (Week 1 vs Week 5)</p>
        </div>

        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-textMuted text-sm font-medium">Previous Weekly Waste</p>
              <h3 className="text-3xl font-bold mt-2">45 kg</h3>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl">
              <Recycle className="h-6 w-6 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-accent text-sm font-medium">Current Expected Waste</p>
              <h3 className="text-3xl font-bold mt-2">15 kg</h3>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <Recycle className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Waste Reduction Trend</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wasteTrendData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="week" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.5rem' }}
                />
                <Area type="monotone" dataKey="expected" stroke="#94A3B8" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorExpected)" name="Pre-AI Expected" />
                <Area type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Actual Waste (AI)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Most Wasted Items</h3>
          <div className="space-y-4">
            {[
              { name: 'Sandwich', waste: '4.2', reduction: '35%' },
              { name: 'Fried Rice', waste: '3.5', reduction: '42%' },
              { name: 'Samosa', waste: '2.8', reduction: '55%' },
              { name: 'Burger', waste: '1.5', reduction: '20%' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-text">{item.name}</h4>
                  <p className="text-sm text-textMuted">{item.waste} kg / week</p>
                </div>
                <div className="text-right">
                  <div className="text-accent text-sm font-semibold mb-1">↓ {item.reduction}</div>
                  <div className="text-xs text-textMuted">improvement</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
